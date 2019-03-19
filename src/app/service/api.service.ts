import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8080';
  // baseUrl = 'http://192.168.0.104:8080';

  token = '';

  auth = {
    login: (params) => {
      return this.http.post(
        this.baseUrl + '/Auth' + '/login',
        params
      );
    },
    signup: (params) => {
      return this.http.post(
        this.baseUrl + '/Auth' + '/signup',
        params
      );
    }
  };

  pageData = {
    libadores: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/libadores',
        this.getHttpOptions()
      );
    },
    datosGeoReferenciacion: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/datosGeoReferenciacion',
        this.getHttpOptions()
      );
    },
    agresor: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/agresor',
        this.getHttpOptions()
      );
    },
    victima: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/victima',
        this.getHttpOptions()
      );
    },
    violenciaIntraFamiliar: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/violenciaIntraFamiliar',
        this.getHttpOptions()
      );
    },
    barrio: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/barrio',
        this.getHttpOptions()
      );
    },
    modeloVehiculo: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/modeloVehiculo',
        this.getHttpOptions()
      );
    },
    decomisos: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/decomisos',
        this.getHttpOptions()
      );
    },
    lesiones: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/lesiones',
        this.getHttpOptions()
      );
    },
    gradoAlcoholVictima: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/gradoAlcoholVictima',
        this.getHttpOptions()
      );
    },
    muertesViolentas: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/muertesViolentas',
        this.getHttpOptions()
      );
    },
    delitosSexuales: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/delitosSexuales',
        this.getHttpOptions()
      );
    },
    amenazas: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/amenazas',
        this.getHttpOptions()
      );
    },
    microTraficoDroga: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/microTraficoDroga',
        this.getHttpOptions()
      );
    },
    vehiculo: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/vehiculo',
        this.getHttpOptions()
      );
    },
    robosVehiculos: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/robosVehiculos',
        this.getHttpOptions()
      );
    },
    accidenteTransito: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/accidenteTransito',
        this.getHttpOptions()
      );
    },
    personasDesaparecidas: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/personasDesaparecidas',
        this.getHttpOptions()
      );
    },
    otrosDelitos: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/otrosDelitos',
        this.getHttpOptions()
      );
    },
    lesionVictima: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/lesionVictima',
        this.getHttpOptions()
      );
    },
    lesionAgresor: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/lesionAgresor',
        this.getHttpOptions()
      );
    },
    robosHurtosGeneral: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/robosHurtosGeneral',
        this.getHttpOptions()
      );
    },
    menuRol: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/menuRol',
        this.getHttpOptions()
      );
    },
    usuarios: () => {
      return this.http.get(
        this.baseUrl + '/PageData' + '/usuarios',
        this.getHttpOptions()
      );
    },
  };

  frecuenciaAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/FrecuenciaAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/FrecuenciaAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/FrecuenciaAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/FrecuenciaAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/FrecuenciaAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoProcedimiento = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoProcedimiento' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoProcedimiento' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoProcedimiento' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoProcedimiento' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoProcedimiento' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoResolucion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoResolucion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoResolucion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoResolucion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoResolucion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoResolucion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  zona = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Zona' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Zona' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Zona' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Zona' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Zona' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  usuarios = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Usuarios' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Usuarios' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Usuarios' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Usuarios' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Usuarios' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  menuRol = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MenuRol' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MenuRol' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MenuRol' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MenuRol' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MenuRol' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  rol = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Rol' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Rol' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Rol' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Rol' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Rol' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  menu = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Menu' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Menu' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Menu' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Menu' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Menu' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  robosHurtosGeneral = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RobosHurtosGeneral' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosHurtosGeneral' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosHurtosGeneral' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosHurtosGeneral' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RobosHurtosGeneral' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  otrosDelitos = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/OtrosDelitos' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/OtrosDelitos' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/OtrosDelitos' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/OtrosDelitos' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/OtrosDelitos' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  parentezcoPersona = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ParentezcoPersona' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ParentezcoPersona' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ParentezcoPersona' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ParentezcoPersona' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ParentezcoPersona' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  alcoholAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AlcoholAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AlcoholAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  procedenciaGrupo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ProcedenciaGrupo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaGrupo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaGrupo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaGrupo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ProcedenciaGrupo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  personasDesaparecidas = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/PersonasDesaparecidas' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/PersonasDesaparecidas' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/PersonasDesaparecidas' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/PersonasDesaparecidas' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/PersonasDesaparecidas' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  accidenteTransito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AccidenteTransito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AccidenteTransito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AccidenteTransito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AccidenteTransito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AccidenteTransito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  robosVehiculos = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RobosVehiculos' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosVehiculos' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosVehiculos' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RobosVehiculos' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RobosVehiculos' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  vehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Vehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Vehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Vehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Vehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Vehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  microTraficoDroga = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MicroTraficoDroga' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MicroTraficoDroga' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MicroTraficoDroga' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MicroTraficoDroga' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MicroTraficoDroga' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  amTipoAmenaza = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AmTipoAmenaza' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AmTipoAmenaza' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AmTipoAmenaza' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AmTipoAmenaza' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AmTipoAmenaza' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  amenazas = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Amenazas' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Amenazas' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Amenazas' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Amenazas' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Amenazas' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  delitosSexuales = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/DelitosSexuales' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/DelitosSexuales' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/DelitosSexuales' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/DelitosSexuales' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/DelitosSexuales' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  muertesViolentas = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MuertesViolentas' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MuertesViolentas' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MuertesViolentas' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MuertesViolentas' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MuertesViolentas' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  gradoAlcoholVictima = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/GradoAlcoholVictima' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholVictima' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholVictima' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholVictima' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/GradoAlcoholVictima' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  alcoholVictima = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AlcoholVictima' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholVictima' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholVictima' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AlcoholVictima' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AlcoholVictima' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  lesiones = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Lesiones' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Lesiones' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Lesiones' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Lesiones' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Lesiones' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  gradoAlcoholAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/GradoAlcoholAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/GradoAlcoholAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/GradoAlcoholAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  rangoLesion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RangoLesion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RangoLesion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RangoLesion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RangoLesion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RangoLesion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  indicioEstupefacientes = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/IndicioEstupefacientes' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/IndicioEstupefacientes' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/IndicioEstupefacientes' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/IndicioEstupefacientes' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/IndicioEstupefacientes' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  grupoFocales = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/GrupoFocales' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/GrupoFocales' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/GrupoFocales' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/GrupoFocales' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/GrupoFocales' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  tipoRinia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoRinia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoRinia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoRinia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoRinia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoRinia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  mecanismoAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MecanismoAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MecanismoAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MecanismoAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MecanismoAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MecanismoAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  responsableEscaner = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ResponsableEscaner' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ResponsableEscaner' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ResponsableEscaner' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ResponsableEscaner' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ResponsableEscaner' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  decomisos = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Decomisos' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Decomisos' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Decomisos' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Decomisos' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Decomisos' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  lugarDonacion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/LugarDonacion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarDonacion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarDonacion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarDonacion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/LugarDonacion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  productoDecomisado = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ProductoDecomisado' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ProductoDecomisado' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ProductoDecomisado' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ProductoDecomisado' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ProductoDecomisado' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/ProductoDecomisado' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  vendedor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Vendedor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Vendedor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Vendedor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Vendedor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Vendedor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/Vendedor' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  descadenante = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Descadenante' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Descadenante' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Descadenante' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Descadenante' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Descadenante' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/Descadenante' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  objetoAgresion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ObjetoAgresion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoAgresion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoAgresion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoAgresion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ObjetoAgresion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/ObjetoAgresion' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  tipoAgresion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoAgresion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAgresion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAgresion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAgresion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoAgresion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/TipoAgresion' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  fiscalia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Fiscalia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscalia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscalia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscalia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Fiscalia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  fiscal = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Fiscal' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscal' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscal' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Fiscal' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Fiscal' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  lugar = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Lugar' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Lugar' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Lugar' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Lugar' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Lugar' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  barrio = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Barrio' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Barrio' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Barrio' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Barrio' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Barrio' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoPunto = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoPunto' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoPunto' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoPunto' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoPunto' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoPunto' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoDelito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoDelito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDelito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDelito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDelito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoDelito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  violenciaIntraFamiliar = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ViolenciaIntraFamiliar' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ViolenciaIntraFamiliar' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ViolenciaIntraFamiliar' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ViolenciaIntraFamiliar' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ViolenciaIntraFamiliar' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoEmpresa = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoEmpresa' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresa' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresa' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresa' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoEmpresa' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  victima = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Victima' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Victima' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Victima' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Victima' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Victima' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/Victima' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  relacionAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RelacionAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RelacionAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RelacionAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RelacionAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RelacionAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  region = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Region' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Region' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Region' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Region' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Region' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  ocupacion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Ocupacion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Ocupacion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Ocupacion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Ocupacion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Ocupacion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  mes = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Mes' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Mes' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Mes' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Mes' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Mes' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  dia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Dia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Dia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Dia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Dia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Dia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  circuito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Circuito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Circuito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Circuito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Circuito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Circuito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  distrito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Distrito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Distrito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Distrito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Distrito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Distrito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  parroquia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Parroquia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Parroquia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Parroquia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Parroquia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Parroquia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  sexo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Sexo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Sexo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Sexo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Sexo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Sexo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  instruccionFormal = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/InstruccionFormal' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/InstruccionFormal' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/InstruccionFormal' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/InstruccionFormal' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/InstruccionFormal' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoDiscapacidad = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoDiscapacidad' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDiscapacidad' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDiscapacidad' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoDiscapacidad' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoDiscapacidad' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  estadoCivil = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/EstadoCivil' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/EstadoCivil' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/EstadoCivil' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/EstadoCivil' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/EstadoCivil' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  etnia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Etnia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Etnia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Etnia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Etnia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Etnia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  nacionalidad = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Nacionalidad' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Nacionalidad' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Nacionalidad' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Nacionalidad' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Nacionalidad' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  libador = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Libador' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Libador' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Libador' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Libador' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/Libador' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };


  libadores = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Libadores' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Libadores' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Libadores' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Libadores' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Libadores' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  datosGeoReferenciacion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/DatosGeoReferenciacion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/DatosGeoReferenciacion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/DatosGeoReferenciacion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/DatosGeoReferenciacion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/DatosGeoReferenciacion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  agresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Agresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Agresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Agresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Agresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Agresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/Agresor' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };
  armMedioSuceso = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ArmMedioSuceso' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ArmMedioSuceso' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ArmMedioSuceso' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ArmMedioSuceso' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ArmMedioSuceso' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  lugarLevantamiento = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/LugarLevantamiento' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarLevantamiento' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarLevantamiento' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarLevantamiento' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/LugarLevantamiento' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  lugarTraslado = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/LugarTraslado' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarTraslado' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarTraslado' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/LugarTraslado' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/LugarTraslado' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  tipoMuerte = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoMuerte' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoMuerte' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoMuerte' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoMuerte' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoMuerte' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  restoVictima = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RestoVictima' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RestoVictima' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RestoVictima' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RestoVictima' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RestoVictima' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  motivoMuerte = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MotivoMuerte' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MotivoMuerte' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MotivoMuerte' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MotivoMuerte' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MotivoMuerte' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };
  medico = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Medico' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Medico' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Medico' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Medico' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Medico' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  objetoRobadoVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ObjetoRobadoVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoRobadoVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoRobadoVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoRobadoVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ObjetoRobadoVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  modalidadRobo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ModalidadRobo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadRobo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadRobo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadRobo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ModalidadRobo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  autorDelito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AutorDelito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AutorDelito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AutorDelito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AutorDelito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AutorDelito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  parteRobadaVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ParteRobadaVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ParteRobadaVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ParteRobadaVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ParteRobadaVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ParteRobadaVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  rhvAgresores = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/RhvAgresores' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/RhvAgresores' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/RhvAgresores' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/RhvAgresores' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/RhvAgresores' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  marcaVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MarcaVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MarcaVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MarcaVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MarcaVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MarcaVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoEmpresaVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoEmpresaVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresaVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresaVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoEmpresaVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoEmpresaVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  servicioVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ServicioVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ServicioVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ServicioVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ServicioVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ServicioVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  dsContinuidadCaso = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/DsContinuidadCaso' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/DsContinuidadCaso' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/DsContinuidadCaso' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/DsContinuidadCaso' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/DsContinuidadCaso' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  amGradoAlcoholAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AmGradoAlcoholAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AmGradoAlcoholAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AmGradoAlcoholAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AmGradoAlcoholAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AmGradoAlcoholAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  amAlcoholAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AmAlcoholAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AmAlcoholAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AmAlcoholAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AmAlcoholAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AmAlcoholAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  amCausaAmenaza = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/AmCausaAmenaza' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/AmCausaAmenaza' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/AmCausaAmenaza' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/AmCausaAmenaza' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/AmCausaAmenaza' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  tipoAmenaza = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoAmenaza' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAmenaza' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAmenaza' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoAmenaza' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoAmenaza' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  causaAmenaza = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/CausaAmenaza' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAmenaza' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAmenaza' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAmenaza' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/CausaAmenaza' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  quienCometeDelito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/QuienCometeDelito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/QuienCometeDelito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/QuienCometeDelito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/QuienCometeDelito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/QuienCometeDelito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  sustanciaMicroTrafico = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/SustanciaMicroTrafico' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/SustanciaMicroTrafico' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/SustanciaMicroTrafico' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/SustanciaMicroTrafico' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/SustanciaMicroTrafico' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/SustanciaMicroTrafico' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  evidenciaEncontrada = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/EvidenciaEncontrada' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/EvidenciaEncontrada' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/EvidenciaEncontrada' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/EvidenciaEncontrada' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/EvidenciaEncontrada' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    },
    autoComplete: (param) => {
      return this.http.post<any[]>(
        this.baseUrl + '/EvidenciaEncontrada' + '/auto-complete',
        param,
        this.getHttpOptions()
      );
    },
  };

  tipoVia = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/TipoVia' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVia' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVia' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/TipoVia' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/TipoVia' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  condicionCalzada = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/CondicionCalzada' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/CondicionCalzada' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/CondicionCalzada' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/CondicionCalzada' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/CondicionCalzada' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  momentoAccidente = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/MomentoAccidente' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/MomentoAccidente' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/MomentoAccidente' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/MomentoAccidente' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/MomentoAccidente' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  procedenciaParte = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ProcedenciaParte' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaParte' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaParte' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ProcedenciaParte' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ProcedenciaParte' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  causaAccidente = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/CausaAccidente' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAccidente' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAccidente' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/CausaAccidente' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/CausaAccidente' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  colorVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ColorVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ColorVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ColorVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ColorVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ColorVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  modeloVehiculo = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ModeloVehiculo' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ModeloVehiculo' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ModeloVehiculo' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ModeloVehiculo' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ModeloVehiculo' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  claseAccidente = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ClaseAccidente' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ClaseAccidente' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ClaseAccidente' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ClaseAccidente' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ClaseAccidente' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  pdCondicionRegresaDesaparecido = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/PdCondicionRegresaDesaparecido' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/PdCondicionRegresaDesaparecido' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/PdCondicionRegresaDesaparecido' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/PdCondicionRegresaDesaparecido' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/PdCondicionRegresaDesaparecido' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  parroquiaDesaparicion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ParroquiaDesaparicion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ParroquiaDesaparicion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ParroquiaDesaparicion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ParroquiaDesaparicion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ParroquiaDesaparicion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  modalidadDelito = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ModalidadDelito' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadDelito' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadDelito' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ModalidadDelito' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ModalidadDelito' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  afectado = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/Afectado' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/Afectado' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/Afectado' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/Afectado' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/Afectado' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  objetoHurtado = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/ObjetoHurtado' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoHurtado' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoHurtado' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/ObjetoHurtado' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/ObjetoHurtado' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  pdMotivoDesaparicion = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/PdMotivoDesaparicion' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/PdMotivoDesaparicion' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/PdMotivoDesaparicion' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/PdMotivoDesaparicion' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/PdMotivoDesaparicion' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  lesionVictima = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/LesionVictima' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionVictima' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionVictima' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionVictima' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/LesionVictima' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };

  lesionAgresor = {
    readAll: () => {
      return this.http.get(
        this.baseUrl + '/LesionAgresor' + '/read-all',
        this.getHttpOptions()
      );
    },
    delete: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionAgresor' + '/delete',
        param,
        this.getHttpOptions()
      );
    },
    create: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionAgresor' + '/create',
        param,
        this.getHttpOptions()
      );
    },
    update: (param) => {
      return this.http.post(
        this.baseUrl + '/LesionAgresor' + '/update',
        param,
        this.getHttpOptions()
      );
    },
    getByPageAndFilter: (param) => {
      return this.http.post<any>(
        this.baseUrl + '/LesionAgresor' + '/get-by-page-and-filter',
        param,
        this.getHttpOptions()
      );
    }
  };


  constructor(
    public http: HttpClient
  ) {
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Authorization': this.token
        })
    };
  }

}
