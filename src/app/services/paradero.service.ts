import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoParadero } from '../interface/info-paraderos.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Paradero } from '../models/paradero'
import { GeoFire } from 'geofire';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})


export class ParaderoService {

  //-----datos de los paraderos -> consumiendo el servicio de paraderos.json
  informacionpard: InfoParadero = {}
  datoscargados = false
  paraderos: any[] = []

  //----referencia la bd 
  dbRef: any;
  geoFire: any;

  //----lista de paraderos
  paraderoList: AngularFireList<any>
  selectedParadero: Paradero = new Paradero()

  constructor(private http: HttpClient, private firebase: AngularFireDatabase) {

  }


  cargarParaderos(linearequerida: number) {
    console.log(linearequerida)

    if (linearequerida == 1) {
      this.paraderos = null

    }

    else if (linearequerida == 2) {

      //leer el archivo json
      this.http.get('https://bus-proyecto.firebaseio.com/paraderos.json')
        .subscribe((response: any) => {
          const mapped = Object.keys(response).map(key => ({ type: key, value: response[key] }));
          this.paraderos = mapped
          console.log(mapped)
        })

      this.paraderos = null
    }

    else {
      //completar con las demas lineas
      this.paraderos = null
    }

  }

  //----cargamos los paraderos al listado
  getParadero(linearequerida: number, idlinea: number, direccionlinea:string) {

    direccionlinea=(direccionlinea == 'ida')?"ida":"vuelta"
   
    if (linearequerida == 2) {

      switch (idlinea) {
        case 2:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/201/${direccionlinea}`)
        case 3:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/202/${direccionlinea}`)
        case 4:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/206/${direccionlinea}`)
        case 5:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/209/${direccionlinea}`)
        case 6:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/301/${direccionlinea}`)
        case 7:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/302/${direccionlinea}`)
        case 8:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/303/${direccionlinea}`)
        case 9:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/404/${direccionlinea}`)
        case 10:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/405/${direccionlinea}`)
        case 11:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/409/${direccionlinea}`)
        case 12:
          return this.paraderoList = this.firebase.list(`paraderos/corredor/412/${direccionlinea}`)
        default:
        
      }


    } else if (linearequerida == 3) {
      
      switch (idlinea) {
        case 2:
          return this.paraderoList = this.firebase.list(`paraderos/metropolitano/A/${direccionlinea}`)
        case 3:
          return this.paraderoList = this.firebase.list(`paraderos/metropolitano/B/${direccionlinea}`)
        case 4:
          return this.paraderoList = this.firebase.list(`paraderos/metropolitano/C/${direccionlinea}`)
        case 5:
          return this.paraderoList = this.firebase.list(`paraderos/metropolitano/D/${direccionlinea}`)
        case 6:
          return this.paraderoList = this.firebase.list(`paraderos/metropolitano/Expreso1/${direccionlinea}`)
       default:
      }

    } else if (linearequerida == 4) {

    } else {

    }

    
  }

  //-----insertamos un nuevo paradero
  insertParadero(paradero: Paradero) {
    //mostrando datos en consola
    console.log(paradero.nombre)
    console.log(paradero.latitud)
    console.log(paradero.longitud)
    console.log(paradero.lineatrans)


    this.dbRef = this.firebase.list('/paraderosgeo').query.ref;
    this.geoFire = new GeoFire(this.dbRef);

    let idregistro = this.dbRef.push().key

    this.paraderoList.push({
      nombre: paradero.nombre,
      latitud: paradero.latitud,
      longitud: paradero.longitud,
      idreferencia: idregistro
    })

    this.geoFire.set(idregistro, [paradero.latitud, -paradero.longitud]).then(function () {
      console.log(idregistro)
      swal.fire('Nuevo Paradero',`Paradero ${paradero.nombre} registrado con exito`,'success');
    }, function (error) {
      console.log("Error: " + error);
    });

  }


}
