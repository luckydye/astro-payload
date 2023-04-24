import { meta } from "../hooks/createCollection";

export function get() {
	return new Response(
		JSON.stringify({
			lastChange: meta.lastChange,
		}),
		{
			status: 200,
		}
	);
}
