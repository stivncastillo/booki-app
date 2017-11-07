import { Book } from './book';

export class Story {
	public date: string;
	public page: string;
	public chapter: string;
	public is_end: string;
	public summary: string;
	public book_id?: string;
	public user_id?: string;
	public updated_at?: string;
	public created_at?: string;
	public book?: Book | null;
	public id?: number;
}
