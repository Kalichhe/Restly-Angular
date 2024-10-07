import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-propiedades',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit{
  @ViewChild('myModal') model:ElementRef | undefined;
  propiedadObj: Propiedades = new Propiedades();
  propiedadList: Propiedades[] = [];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem("Restly");
      if (localData != null) {
        this.propiedadList = JSON.parse(localData);
      }
    }
  }
  

  openModel() {
    this.propiedadObj = new Propiedades();
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }
  closeModel() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onEdit(item: Propiedades){
    this.propiedadObj = item;
    this.openModel();
  }

  onDelete(item:Propiedades){
    const isDelet = confirm("¿Estás seguro que quieres eliminarlo?");
    if(isDelet){
      const currentRecord = this.propiedadList.findIndex(m=>m.id === this.propiedadObj.id);
      this.propiedadList.splice(currentRecord, 1);
      localStorage.setItem('Restly', JSON.stringify(this.propiedadList));

    }

  }

  updateModel() {
    const currentRecord = this.propiedadList.find(m=>m.id === this.propiedadObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.propiedadObj.name;
      currentRecord.adress = this.propiedadObj.adress;
      currentRecord.movilNo = this.propiedadObj.movilNo;
    };
    localStorage.setItem('Restly', JSON.stringify(this.propiedadList));
    this.closeModel()
  }

  saveModel() {
    debugger;
    const isLocalPresent = localStorage.getItem("Restly");
    if (isLocalPresent != null){
      const oldArr = JSON.parse(isLocalPresent);
      this.propiedadObj.id = oldArr.lenght + 1;
      oldArr.push(this.propiedadObj);
      this.propiedadList = oldArr;
      localStorage.setItem('Restly', JSON.stringify(oldArr));
    } else{

      const newArr = [];
      newArr.push(this.propiedadObj);
      this.propiedadObj.id = 1;
      this.propiedadList = newArr;
      localStorage.setItem('Restly', JSON.stringify(newArr));

    } 
    this.closeModel()
  }
}

export class Propiedades {
  id: number;
  name: string;
  movilNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  adress: string;
  

  constructor() {
    {
      this.id = 0;
      this.name= '';
      this.movilNo = '';
      this.email= '';
      this.city= '';
      this.state = '';
      this.pincode= '';
      this.adress= '';
    }
  }
}
