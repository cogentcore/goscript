import * as $ from "@goscript/builtin/index.js";
import { RemoveAll as removeAllPath } from "./file_js.gs.js";

export function RemoveAll(path: string): Promise<$.GoError> {
	return removeAllPath(path)
}
