// src/app/core/query-params.ts
function readNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}
function readBoolean(value) {
  return value === "true" || value === "1";
}
function readText(value) {
  return (value ?? "").trim();
}
function readOneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
function cleanParams(params) {
  const out = {};
  for (const [key, value] of Object.entries(params)) {
    out[key] = value === "" || value === null || value === false ? null : value;
  }
  return out;
}
function mergeQueryParams(router, params) {
  void router.navigate([], {
    queryParams: cleanParams(params),
    queryParamsHandling: "merge",
    replaceUrl: true
  });
}
function formatDateTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()))
    return "\u2014";
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export {
  readNumber,
  readBoolean,
  readText,
  readOneOf,
  mergeQueryParams,
  formatDateTime
};
