import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/Services/authentication.service';
import { User } from 'src/Model/user';
import { PersonService } from 'src/Services/person.service';
import { Person } from 'src/Model/Person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  user: any;
  person = new Person;
  PersonLs: Person[] = [];
  IsEdit: boolean = false;
  constructor(private Authen: AuthenticationService, private personS: PersonService
  ) {
  }
  columns = ["ID Card", "First Name", "Last Name", "Edit", "Delete"];
  index = ["idCard", "firstname", "lastname", "Edit", "Delete"];
  ngOnInit() {
    this.Authen.getStatus().subscribe(user => {
      if (user === null) {
        this.user = new User();
      } else {
        this.user = user;
      }
      this.loadGrd();
    });


  }

  loadGrd() {

    this.personS.getPerson().subscribe(response => {
      this.PersonLs = response;
    },
      (error) => console.log(error)
    )
  }

  chkDigitPid(p_iPID) {
    var total = 0;
    var iPID;
    var chk;
    var Validchk;
    iPID = p_iPID.replace(/-/g, "");
    Validchk = iPID.substr(12, 1);
    var j = 0;
    var pidcut;
    for (var n = 0; n < 12; n++) {
      pidcut = parseInt(iPID.substr(j, 1));
      total = (total + ((pidcut) * (13 - n)));
      j++;
    }

    chk = 11 - (total % 11);

    if (chk == 10) {
      chk = 0;
    } else if (chk == 11) {
      chk = 1;
    }
    if (chk != Validchk) {
      alert("ระบุหมายเลขประจำตัวประชาชนไม่ถูกต้อง");
      return false;
    }
   return true;
  }

  save() {
    if (this.IsEdit) {
      this.personS.EditPerson(this.person).subscribe(response => {
        this.loadGrd();
      },
        (error) => console.log(error)
      )
    } else {
      debugger;
      if (!this.chkDigitPid(this.person.idCard)) {
        return;
      }
      this.personS.savePerson(this.person).subscribe(response => {
        this.loadGrd();
      },
        (error) => console.log(error)
      )
    }

    alert("Save complelte");
    this.loadGrd();
    this.person = new Person;
    this.IsEdit = false;
  }
  Edit(p) {
    this.IsEdit = true;
    this.PersonLs.forEach(e => {
      if (e.idCard == p) {
        this.person.idCard = e.idCard;
        this.person.firstname = e.firstname;
        this.person.lastname = e.lastname;
      }
    });
  }
  Delete(p) {
    this.personS.DeletePerson(p).subscribe(response => {
      this.loadGrd();
    },
      (error) => console.log(error)
    )

  }
}
