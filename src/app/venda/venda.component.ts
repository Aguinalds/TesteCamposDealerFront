import { Component } from '@angular/core';
import { Venda } from '../../models/venda';
import { VendaService } from '../../service/venda.service';
import { ProdutoService } from '../../service/produto.service';
import { ClienteService } from '../../service/cliente.service';
import { Produto } from '../../models/produto';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss',
})
export class VendaComponent {
  vendas: Venda[] = [];
  produtos: Produto[] = [];
  clientes: Cliente[] = [];
  vendaSelecionada!: Venda;

  constructor(private vendaService: VendaService,private produtoService: ProdutoService,private clienteService: ClienteService ) {}

  ngOnInit(): void {
    this.getVendas();
    this.getProdutos();
    this.getClientes();

  }

  getVendas(): void {
    this.vendaService.getVenda().subscribe((vendas) => {
      console.log('Dados recebidos:', vendas); // Adicione esta linha para visualizar os dados recebidos
      this.vendas = vendas;
    });
  }
  getProdutos(): void {
    this.produtoService.getProdutos()
      .subscribe(produtos => this.produtos = produtos);
  }

  getClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  

  abrirModalAdicionar(): void {
    this.vendaSelecionada = {
      idVenda: 0,
      dthVenda: new Date(),
      qtdVenda: 0,
      produtoId: 0,
      clienteId: 0,
      produto: {idProduto: 0, dscProduto: "", vlrUnitario: 0},
      cliente: {idCliente: 0, nmCliente: "", cidade: ""},
      vlrTotalVenda: 0,
      vlrUnitarioVenda: 0,
    }; // Armazena o venda selecionado
  }

  abrirModalEditar(venda: Venda): void {
    this.vendaSelecionada = { ...venda }; // Armazena o venda selecionado
  }

  abrirModalExcluir(venda: Venda): void {
    this.vendaSelecionada = { ...venda }; // Armazena o venda selecionado
  }

  adicionarVenda(venda: Venda): void {
    if (this.vendaSelecionada) {
      this.vendaService.postVenda(this.vendaSelecionada).subscribe(
        () => {
          console.log('Venda adicionado com sucesso:', this.vendaSelecionada);
          this.getVendas();
          window.location.reload(); // Recarrega a página
        },
        (error) => {
          console.error('Erro ao salvar venda:', error);
          console.log('Dados enviados:', this.vendaSelecionada); // Adicione esta linha para visualizar os dados recebidos
          window.location.reload(); // Recarrega a página
        }
      );
    }
  }

  editarVenda(venda: Venda): void {
    if (this.vendaSelecionada) {
      this.vendaService.putVenda(this.vendaSelecionada).subscribe(
        () => {
          console.log('Venda editado com sucesso:', this.vendaSelecionada);
          this.getVendas();
          window.location.reload(); // Recarrega a página
        },
        (error) => {
          console.error('Erro ao editar venda:', error);
          console.log('Erro ao editar venda:', this.vendaSelecionada);
        }
      );
    }
  }

  excluirVenda(venda: Venda): void {
    this.vendaService.DeleteVenda(venda).subscribe((vendaDeletada) => {
      console.log('Venda Deletado:', vendaDeletada);
    });
    this.getVendas();
    window.location.reload(); // Recarrega a página
  }
}
