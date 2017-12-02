import { Book } from './book';

export class Story {
	public date: string;
	public page: string;
	public is_end: string;
	public summary: string;
	public chapter?: string;
	public book_id?: number;
	public user_id?: number;
	public updated_at?: string;
	public created_at?: string;
	public book?: Book | null;
	public id?: number;
}
