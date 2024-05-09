import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../environments/environment';
import Session from '../extensions/session';

export class CoreService {
	private readonly BaseUrl = environment.baseUrl;

	constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

	protected get<R>(path: string, params?: HttpParams): Observable<R> {
		return this.http
			.get<R>(this.BaseUrl + path, { headers: this.getHeaders(), params: params})
			.pipe(catchError(this.handleError));
	}

	protected post<S, R>(path: string, body?: S, params?: HttpParams): Observable<R> {
		return this.http
			.post<R>(this.BaseUrl + path, body, { headers: this.getHeaders(), params: params })
			.pipe(catchError(this.handleError));
	}

	protected put<S, R>(path: string, body: S): Observable<R> {
		return this.http
			.put<R>(this.BaseUrl + path, body, { headers: this.getHeaders() })
			.pipe(catchError(this.handleError));
	}

	protected delete<R>(path: string): Observable<R> {
		return this.http
			.delete<R>(this.BaseUrl + path, { headers: this.getHeaders() })
			.pipe(catchError(this.handleError));
	}

	private getHeaders(): HttpHeaders | { [header: string]: string | string[]; } {
		var headers = new HttpHeaders({ "Content-Type": "application/json" });
		var token = Session.getToken();
		if (token.value != null)
			headers = headers.append("Authorization", "Bearer " + token.value);
		return headers
	}

	private handleError = (error: HttpErrorResponse): Observable<any> => {
		if (error.status == HttpStatusCode.Status401Unauthorized) {
			Session.removeToken();
			this.router.navigate(["/login"]);
		}
		if (error.status == HttpStatusCode.Status400BadRequest || error.status == HttpStatusCode.Status403Forbidden){
			this.toastr.error(error.error, "Oops!")
		}

		if (error.status == HttpStatusCode.Status500InternalServerError || error.status == 0){
			this.toastr.error("Cannot connect to the server", "Error")
		}
		return throwError(() => error);
	}
}

export class HttpStatusCode {
	static readonly Status400BadRequest = 400;
	static readonly Status401Unauthorized = 401;
	static readonly Status403Forbidden = 403;
	static readonly Status500InternalServerError = 500;
}