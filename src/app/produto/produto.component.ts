import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];
  produtoSelecionado!: Produto;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  abrirModalAdicionar(): void {
    this.produtoSelecionado = {idProduto: 0, dscProduto: "", vlrUnitario: 0}; // Armazena o produto selecionado
  }

  abrirModalEditar(produto: Produto): void {
    this.produtoSelecionado = {... produto}; // Armazena o produto selecionado
  }

  abrirModalExcluir(produto: Produto): void {
    this.produtoSelecionado = {... produto}; // Armazena o produto selecionado

  }

  adicionarProduto(produto: Produto): void {
    if (this.produtoSelecionado) {
      this.produtoService.postProdutos(this.produtoSelecionado)
        .subscribe(() => {
          console.log('Produto adicionado com sucesso:', this.produtoSelecionado);
          this.getProdutos();
          window.location.reload(); // Recarrega a página
          
        }, error => {
          console.error('Erro ao salvar produto:', error);
          // Lógica para tratamento de erro, se necessário
        });
    }
  }

  editarProduto(produto: Produto): void {
    if (this.produtoSelecionado) {
      this.produtoService.putProdutos(this.produtoSelecionado)
        .subscribe(() => {
          console.log('Produto editado com sucesso:', this.produtoSelecionado);
          this.getProdutos();
          window.location.reload(); // Recarrega a página
          
        }, error => {
          console.error('Erro ao editar produto:', error);
          // Lógica para tratamento de erro, se necessário
        });
    }
  }
  
  excluirProduto(produto: Produto): void {
    this.produtoService.DeleteProdutos(produto)
      .subscribe(produtoDeletado => {
        console.log("Produto Deletado:", produtoDeletado);
      });
      this.getProdutos();
      window.location.reload(); // Recarrega a página
  }
}
