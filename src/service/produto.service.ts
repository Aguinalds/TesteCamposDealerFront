import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtoUrl = 'https://localhost:7141/api/Produto/entitys';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.produtoUrl);
  }

  postProdutos(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.produtoUrl, produto); // Faz a requisição PUT com o corpo do cliente
  }

  putProdutos(produto: Produto): Observable<Produto> {
    const url = `${this.produtoUrl}/${produto.idProduto}`; // Monta a URL com o ID do cliente
    return this.http.put<Produto>(url, produto); // Faz a requisição PUT com o corpo do cliente
  }

  DeleteProdutos(produto: Produto): Observable<Produto> {
    const url = `${this.produtoUrl}/${produto.idProduto}`; // Monta a URL com o ID do cliente
    return this.http.delete<Produto>(url); // Faz a requisição PUT com o corpo do cliente
  }
}
