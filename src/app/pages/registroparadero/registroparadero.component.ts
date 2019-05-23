import { Component, OnInit } from '@angular/core';
import { ParaderoService } from 'src/app/services/paradero.service';
import { NgForm } from '@angular/forms';
import { Paradero } from 'src/app/models/paradero';
import { element } from '@angular/core/src/render3';


@Component({
  selector: 'app-registroparadero',
  templateUrl: './registroparadero.component.html',
  styleUrls: ['./registroparadero.component.css']
})
export class RegistroparaderoComponent implements OnInit {

  paraderoList:Paradero[];

  lineaSeleccionada;
  rdbtnselec='ida';
  rutadelinea;

  lineas = [{ Id: 1, Nombre: "Seleccione linea de Transporte" },
  { Id: 2, Nombre: "Corredor Complementario" },
  { Id: 3, Nombre: "Metropolitano" },
  { Id: 4, Nombre: "Linea 1" }];

  corredores = [{Id:1,Nombre:"Selecciona Corredor"},
  {Id:2,Nombre:"Corredor Rojo - 201"},
  {Id:3,Nombre:"Corredor Rojo - 202"},
  {Id:4,Nombre:"Corredor Rojo - 206"},
  {Id:5,Nombre:"Corredor Rojo - 209"},
  {Id:6,Nombre:"Corredor Azul - 301"},
  {Id:7,Nombre:"Corredor Azul - 302"},
  {Id:8,Nombre:"Corredor Azul - 303"},
  {Id:9,Nombre:"Corredor Morado - 404"},
  {Id:10,Nombre:"Corredor Morado - 405"},
  {Id:11,Nombre:"Corredor Morado - 409"},
  {Id:12,Nombre:"Corredor Morado - 412"}];

  metropolitanos = [
  {Id:1,Nombre:"Selecciona Linea del Metropolitano"},
  {Id:2,Nombre:"A"},
  {Id:3,Nombre:"B"},
  {Id:4,Nombre:"C"},
  {Id:5,Nombre:"D"},
  {Id:6,Nombre:"Expreso 1"}];

  trenes=[
    {Id:1, Nombre:"Selecciona Direccion del Metro"},
    {Id:2,Nombre:"Villa El Salvador - Bayovar"},
    {Id:3, Nombre:"Bayovar - Villa El Salvador"}
  ]

  constructor(public paraderoSer: ParaderoService) { }


  ngOnInit() {

    //obtiendo la lista de paraderos, presente en firebase

    //this.resetForm()
    this.lineaSeleccionada=1
    this.rutadelinea=1




  }

  onSubmit(paraderoForm: NgForm) {
    console.log(paraderoForm.value)
    this.paraderoSer.insertParadero(paraderoForm.value)
    console.log(this.lineaSeleccionada) 
   
  }

 
  resetForm(paraderoForm?: NgForm) {
    if (paraderoForm != null) {
      paraderoForm.reset()
      this.paraderoSer.selectedParadero = new Paradero()
    }
  }

  onSelectedChange(value: number) {
    //this.paraderoSer.cargarParaderos(value)
    this.lineaSeleccionada=value
    this.paraderoList=null
  }


  
  onSelectedChangeRdbtn(value: number) {
  




  }



  onSelectedChangeRutaLinea(value: number) {

    console.log(this.rutadelinea+"hola")

    let arreglocon=[]
    arreglocon=(this.lineaSeleccionada==2)?this.corredores:(this.lineaSeleccionada==3)?this.metropolitanos:null

    if(arreglocon==null && this.lineaSeleccionada==1){

    }else{

   

    this.paraderoSer.getParadero(this.lineas[this.lineaSeleccionada-1].Id,arreglocon[this.rutadelinea-1].Id,this.rdbtnselec).snapshotChanges()
    .subscribe(item=>{
      this.paraderoList = [];
      item.forEach(element =>{
        let x =element.payload.toJSON();
        x["$key"]=element.key;
        this.paraderoList.push(x as Paradero)
      })
    })
  }
  
    this.rutadelinea=1


  }

}
