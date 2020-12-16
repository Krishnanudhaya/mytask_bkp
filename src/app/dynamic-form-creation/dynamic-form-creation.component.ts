import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicFormService } from "../dynamic-form-service";
import { DynamicForm } from "../dynamicForm";
import { DynamicFormData } from "../dynamicFormData";
@Component({
  selector: 'app-dynamic-form-creation',
  templateUrl: './dynamic-form-creation.component.html',
  styleUrls: ['./dynamic-form-creation.component.css']
})
export class DynamicFormCreationComponent implements OnInit {
  model: any = {};
  controls = {};
  formDataArr=[];
  dynamicForm = new DynamicForm();
  dynamicFormData = new DynamicFormData();
  dynamicFormm: FormGroup;
  controlType = ["text", "number", "select", "email"];
  stringType = ["alpha", "numeric", "alphanumeric", "all"];

  specifyLength: boolean = false;
  enableFormDesign: boolean = false;
  temp :any={};
  /*temp = {
    "name": "Contact Us",
    "fields": [
        {
            "label": "Name",
            "name": "Name",
            "id": "name",
            "type": "text",
            "values":[],
            "validation": {
                "isMandatory": true,
                "stringType": "alpha",
                "specifyLength": false
            }
        },
        {
            "label": "Age",
            "name": "Age",
            "id": "age",
            "type": "number",
            "values":[],
            "validation": {
                "isMandatory": true,
                "minInclusive": 1,
                "maxInclusive": 20,
                "specifyLength": true
            }
        },
        {
            "label": "City",
            "name": "City",
            "id": "city",
            "type": "select",
            "values": [
                "Chennai",
                "Bangalore",
                "Coimbatore",
                "Mumbai"
            ],
            "validation": {
                "isMandatory": true,
                "isMultiSelection": false,
                "specifyLength": false
            }
        },
        {
            "label": "Email",
            "name": "Email",
            "id": "email",
            "type": "email",
            "values":[],
            "validation": {
                "isMandatory": true,
                "specifyLength": false
            }
        }
    ]
};

  /*temp1 = {
    "name": "Contact Us",
    fields: [{
      label: "Name",
      name: "Name",
      id: "name",
      type: "text",
      validation: {
        isMandatory: true,
        stringType: "alpha" // (other values - alphaNumeric, all)
      }
    },
    {
      label: "Age",
      name: "Age",
      id: "age",
      type: "number",
      validation: {
        isMandatory: true,
        minInclusive: 1,
        maxInclusive: 20,
      }
    },
    {
      label: "City",
      name: "City",
      id: "city",
      type: "select",
      values: ["Chennai", "Bangalore", "Coimbatore"],
      validation: {
        isMandatory: true,
        isMultiSelection: false
      }
    },
    {
      label: "Email",
      name: "Email",
      id: "email",
      type: "email",
      validation: {
        isMandatory: true,
      }
    }
    ]

  };*/

  ngOnInit() {

    this.refreshFormData();

  }

  refreshFormData()
  {
    this.dynamicFormService.getDynamicFormDataList().subscribe(data => {
      console.log("hit ", data);
      this.formDataArr=data.payload;
      
    }, error => console.log(error));
  }



  constructor(private router: Router, private activatedRoute:ActivatedRoute,private dynamicFormService: DynamicFormService) {

    this.dynamicFormService.getDynamicForm("contact us").subscribe(data => {
      
      this.temp=data.payload.formStructure;

      console.log("hit ", this.temp);

      this.temp.fields.forEach(res => {
        const tempFiledsValidationsArray = [];
  
        if (res.validation.isMandatory) {
          console.log("valid result", res.validation.isMandatory)
          tempFiledsValidationsArray.push(
            Validators.required
          );
        }
        switch (res.validation.stringType) {
          case "alpha":
            tempFiledsValidationsArray.push(
              Validators.pattern("^[A-Za-z]+$")//only alphabets
            );
            break;
          case "alphanumeric":
            tempFiledsValidationsArray.push(
              Validators.pattern("([A-z0-9a-z\s]){2,}")// alphanumeric
            );
            break;
          case "all":
            tempFiledsValidationsArray.push(
              Validators.pattern(".{2,}")//all
            );
            break;
  
  
          default:
            tempFiledsValidationsArray.push(
              Validators.pattern(".{2,}")//all
            );
            break;
        }
  
        if (res.validation.minInclusive && res.validation.maxInclusive) {
          tempFiledsValidationsArray.push(Validators.min(res.validation.minInclusive), Validators.max(res.validation.maxInclusive));
  
        }
  
  
        this.controls[res.label] = new FormControl('', tempFiledsValidationsArray);
      });
  
      this.dynamicFormm = new FormGroup(this.controls);
  
      for (let index = 0; index < this.temp.fields.length; index++) {
  
        let object = this.temp.fields[index];
        if (this.temp.fields[index]["type"] != "select")
          this.temp.fields[index]["values"] = [];
        if (object.validation.maxInclusive != null) {
          Object.assign(this.temp.fields[index].validation, { "specifyLength": true });
        }
        else {
          Object.assign(this.temp.fields[index].validation, { "specifyLength": false });
        }
  
      }
      console.log("result json", this.temp.fields)
      
    }, error => console.log(error));

   

  }

  onSubmit() {
    console.log("newForm value", this.dynamicFormm.value);

    this.dynamicFormData.formData = this.dynamicFormm.value;
    this.dynamicFormData.formDataId = null;
    this.dynamicFormData.formName = "contact us";
    this.dynamicFormData.createdDate = new Date();
    this.dynamicFormData.modifiedDate = new Date();

    this.dynamicFormService.createDynamicFormData(JSON.stringify(this.dynamicFormData)).subscribe(data => {
      console.log("hit ", data);
      this.refreshFormData();
    }, error => console.log(error));

  }

  toggleScreen() {
    this.enableFormDesign = !this.enableFormDesign;
  }

  onChangeControlType(controlType) {
    console.log("onChangeControlType", controlType)

  }

  onChangeStringType(stringType) {
    console.log("onChangeStringType", stringType)

  }

  formDesign() {

    for (let index = 0; index < this.temp.fields.length; index++) {

      let object = this.temp.fields[index];
      this.temp.fields[index].label = this.temp.fields[index].name;
      this.temp.fields[index].name = this.temp.fields[index].name;
      this.temp.fields[index].id = this.temp.fields[index].name;

    }
    this.insertIntoFormGroup();
    console.log("formDesign", JSON.stringify(this.temp));

    this.dynamicForm.formStructure = this.temp;
    this.dynamicForm.formDesignId = 3;
    this.dynamicForm.formName = "contact us";
    this.dynamicForm.createdDate = new Date();
    this.dynamicForm.modifiedDate = new Date();

    this.dynamicFormService.createDynamicForm(JSON.stringify(this.dynamicForm)).subscribe(data => {
      console.log("hit ", data);
    }, error => console.log(error));


    this.router.navigate(['/dynamicform']);
    this.enableFormDesign = false;


  }

  onChangeDropdown(index, values) {
    var x = values;
    console.log("index,x =", index, x)
    this.temp.fields[index].values = x.split(",");
    console.log("this.temp.fields[index].values =", this.temp.fields[index].values);
    console.log("result json", this.temp.fields)
  }

  addFormControl() {


    var obj = {
      label: "",
      name: "",
      id: "",
      type: "text",
      values: [],
      validation: {
        isMandatory: false,
        isMultiSelection: false,
        specifyLength: false,
        stringType: undefined,
        minInclusive: null,
        maxInclusive: null,// (other values - alphaNumeric, all),
      }
    };

    this.temp.fields.push(obj);


  }

  deleteFormControlByName(name) {
    console.log("name", name);
    var outout = this.temp.fields.findIndex(a => a.name === name);
    console.log("output", outout);
    this.temp.fields.splice(outout, 1)
    //print result
    console.log(this.temp.fields)
  }

  insertIntoFormGroup() {
    this.controls = {};
    this.temp.fields.forEach(obj => {
      const tempFiledsValidationsArray = [];
      if (obj.validation.isMandatory) {
        console.log("valid result", obj.validation.isMandatory)
        tempFiledsValidationsArray.push(
          Validators.required
        );
      }
      switch (obj.validation.stringType) {
        case "alpha":
          tempFiledsValidationsArray.push(
            Validators.pattern("^[A-Za-z]+$")//only alphabets
          );
          break;
        case "alphanumeric":
          tempFiledsValidationsArray.push(
            Validators.pattern("([A-z0-9a-z\s]){2,}")// alphanumeric
          );
          break;
        case "all":
          tempFiledsValidationsArray.push(
            Validators.pattern(".{2,}")//all
          );
          break;


        default:
          tempFiledsValidationsArray.push(
            Validators.pattern(".{2,}")//all
          );
          break;
      }

      if (obj.validation.minInclusive && obj.validation.maxInclusive) {
        tempFiledsValidationsArray.push(Validators.min(obj.validation.minInclusive), Validators.max(obj.validation.maxInclusive));

      }


      this.controls[obj.label] = new FormControl('', tempFiledsValidationsArray);

      this.dynamicFormm = new FormGroup(this.controls);

      console.log("this.dynamicFormm = > ", this.dynamicFormm);

      for (let index = 0; index < this.temp.fields.length; index++) {

        let object = this.temp.fields[index];
        if (object.validation.maxInclusive != null) {
          Object.assign(this.temp.fields[index].validation, { "specifyLength": true });
        }
        else {
          Object.assign(this.temp.fields[index].validation, { "specifyLength": false });
        }
      }


    });
  }
  onCancelClick(){
    this.router.navigate(['/dynamicform']);
    this.toggleScreen();
  }
}