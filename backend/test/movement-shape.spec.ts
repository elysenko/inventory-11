import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MovementType } from '@prisma/client';
import { MovementsService } from '../src/movements/movements.service';
import type { PrismaService } from '../src/prisma/prisma.service';

/**
 * Shape validation runs before any database work, so a stub Prisma is enough.
 * If a case ever reaches the transaction the stub throws, which fails the test
 * loudly rather than silently passing.
 */
const unreachablePrisma = {
  $transaction: () => {
    throw new Error('should not reach the transaction — shape check must reject first');
  },
} as unknown as PrismaService;

describe('MovementsService — movement shape rules', () => {
  const service = new MovementsService(unreachablePrisma);
  const move = (body: Record<string, unknown>) =>
    service.create(
      { itemId: 'item-1', qty: 1, ...body } as never,
      'user-1',
    );

  const expectRejection = async (body: Record<string, unknown>, message: string) => {
    await expect(move(body)).rejects.toMatchObject({
      response: expect.objectContaining({ message }),
    });
    await expect(move(body)).rejects.toBeInstanceOf(BadRequestException);
  };

  describe('IN', () => {
    it('requires a destination', async () => {
      await expectRejection(
        { type: MovementType.IN },
        'Choose the location the stock is arriving at.',
      );
    });

    it('forbids a source', async () => {
      await expectRejection(
        { type: MovementType.IN, fromLocId: 'a', toLocId: 'b' },
        'A stock-in has no source location.',
      );
    });
  });

  describe('OUT', () => {
    it('requires a source', async () => {
      await expectRejection(
        { type: MovementType.OUT },
        'Choose the location the stock is leaving.',
      );
    });

    it('forbids a destination', async () => {
      await expectRejection(
        { type: MovementType.OUT, fromLocId: 'a', toLocId: 'b' },
        'A stock-out has no destination location.',
      );
    });
  });

  describe('TRANSFER', () => {
    it('requires a source', async () => {
      await expectRejection(
        { type: MovementType.TRANSFER, toLocId: 'b' },
        'Choose the location the stock is leaving.',
      );
    });

    it('requires a destination', async () => {
      await expectRejection(
        { type: MovementType.TRANSFER, fromLocId: 'a' },
        'Choose the location the stock is arriving at.',
      );
    });

    it('refuses a transfer to the same location', async () => {
      await expectRejection(
        { type: MovementType.TRANSFER, fromLocId: 'a', toLocId: 'a' },
        'A transfer needs two different locations.',
      );
    });
  });

  it('lets a well-formed movement through to the transaction', async () => {
    // Reaching the stub transaction proves the shape check passed.
    await expect(
      move({ type: MovementType.IN, toLocId: 'b' }),
    ).rejects.toThrow('should not reach the transaction');
  });
});

describe('MovementsService — item history', () => {
  it('404s for an unknown item rather than returning an empty log', async () => {
    const prisma = {
      item: { findUnique: jest.fn().mockResolvedValue(null) },
    } as unknown as PrismaService;
    await expect(new MovementsService(prisma).findForItem('ghost')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
