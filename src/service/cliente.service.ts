import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteUrl = 'https://localhost:7141/api/Cliente/entitys';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteUrl);
  }

  postClientes(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteUrl, cliente); // Faz a requisição PUT com o corpo do cliente
  }

  putClientes(cliente: Cliente): Observable<Cliente> {
    const url = `${this.clienteUrl}/${cliente.idCliente}`; // Monta a URL com o ID do cliente
    return this.http.put<Cliente>(url, cliente); // Faz a requisição PUT com o corpo do cliente
  }

  DeleteClientes(cliente: Cliente): Observable<Cliente> {
    const url = `${this.clienteUrl}/${cliente.idCliente}`; // Monta a URL com o ID do cliente
    return this.http.delete<Cliente>(url); // Faz a requisição PUT com o corpo do cliente
  }
}
