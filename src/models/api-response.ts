export class APIResponse {
	public success?: string;
	public message?: string;
	public meta?: {
		last_page: number
	};
	public data?: [any];
}
