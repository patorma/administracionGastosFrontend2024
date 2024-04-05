import { Component, OnInit,Input ,SimpleChanges} from '@angular/core';

@Component({
  selector: 'paginador-gastos',
  templateUrl: './paginador-gastos.component.html',

})
export class PageComponent implements OnInit {
  @Input() paginador: any;

  paginas: number[]  = [];

 public  desde: number =0 ;
  public hasta: number =0;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador'];

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    // se calcula el desde y hata para calcular el rango a mostrar en el paginador
    // en desde habran dos calculos
    // primer parametro de desde el maximo entre  y nuestra pagina actual menos 4 y segundo parametro totaldepaginas-5
    // min [max (el minimo que podria tener el desde  y la pagina actual-4)]
    // la pagina actual la obtenemos del paginador a traves del atributo number

    this.desde = Math.min( Math.max(1, this.paginador.number-4), this.paginador.totalPages-5);
    // max[el minimo entre el total de paginas y nuestra pagina actual + 4]
    this.hasta = Math.max(Math.min(this.paginador.totalPages,this.paginador.number+4), 6);

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor,indice) => indice + this.desde);
    } else {
    //  en el contructor(Array) el numero de elementos,
    // totalPages(este atributo contiene el total de paginas
    // que existe dentro de los atributos del  paginador)
    // se llena este arreglo con un valor por defecto
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor,indice) => indice + 1);
  }
  }
}
