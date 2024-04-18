import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private vendaUrl = 'https://localhost:7141/api/Venda';

  constructor(private http: HttpClient) { }

  getVenda(): Observable<Venda[]> {
    const url = `${this.vendaUrl}/VendasGetAll`; 
    return this.http.get<Venda[]>(url);
  }

  postVenda(venda: Venda): Observable<Venda> {
    const url = `${this.vendaUrl}/AddVenda`; 
    return this.http.post<Venda>(url, venda); // Faz a requisição PUT com o corpo do cliente
  }

  putVenda(venda: Venda): Observable<Venda> {
    const url = `${this.vendaUrl}/PutVenda/?id=${venda.idVenda}`; 
    return this.http.put<Venda>(url, venda); // Faz a requisição PUT com o corpo do cliente
  }

  DeleteVenda(venda: Venda): Observable<Venda> {
    const url = `${this.vendaUrl}/DeleteVenda/${venda.idVenda}`; 
    return this.http.delete<Venda>(url); // Faz a requisição PUT com o corpo do cliente
  }
}
