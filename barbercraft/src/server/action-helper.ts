import { ActionResult } from "./types";
import { mapDomainError } from "./errors";

/**
 * Executes a server action block with standard domain error handling and typed return.
 */
export async function runAction<T>(fn: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (err) {
    const { error, code } = mapDomainError(err);
    return { ok: false, error, code };
  }
}

