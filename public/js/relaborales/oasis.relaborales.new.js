/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  22-10-2014
 */
/**
 * Función para definir el contenido de la grilla de cargos acéfalos de acuerdo a los datos enviados como parámetros.
 */
function definirGrillaParaSeleccionarCargoAcefalo(numCertificacion,codCargo){
    var theme = prepareSimulator("grid");
    var sourceCargo =
    {
        datatype: "json",
        datafields: [
            { name: 'seleccionable', type: 'string' },
            { name: 'codigo', type: 'string' },
            /*{ name: 'finpartida', type: 'string' },*/
            { name: 'id_condicion', type: 'string' },
            { name: 'condicion', type: 'string' },
            { name: 'id_organigrama', type: 'integer' },
            { name: 'id_cargo', type: 'string' },
            { name: 'gerencia_administrativa', type: 'string' },
            { name: 'departamento_administrativo', type: 'string' },
            { name: 'nivelsalarial', type: 'string' },
            { name: 'cargo', type: 'string' },
            { name: 'sueldo', type: 'numeric' },
        ],
        url: '/relaborales/listcargos',
        cache: false
    };
    var dataAdapterCargo = new $.jqx.dataAdapter(sourceCargo);
    cargarRegistrosDeCargos();
    function cargarRegistrosDeCargos(){
        $("#divGrillaParaSeleccionarCargo").jqxGrid(
            {
                theme:'oasis',
                width: '100%',
                height:250,
                source: dataAdapterCargo,
                sortable: true,
                altRows: true,
                groupable: true,
                columnsresize: true,
                pageable: false,
                pagerMode: 'advanced',
                showfilterrow: true,
                filterable: true,
                columns: [
                    {
                        text: '#', sortable: false, filterable: false, editable: false,
                        groupable: false, draggable: false, resizable: false,
                        datafield: '', columntype: 'number', width: 50
                    },
                    { text: 'Opción', datafield: 'seleccionable', width: 100,sortable:false, showfilterrow:false, filterable:false, columntype: 'button', cellsrenderer: function () {
                        return "Seleccionar";
                    }, buttonclick: function (row) {
                        editrow = row;
                        var offset = $("#divGrillaParaSeleccionarCargo").offset();
                        var dataRecord = $("#divGrillaParaSeleccionarCargo").jqxGrid('getrowdata', editrow);
                        agregarCargoSeleccionadoEnGrilla(dataRecord.id_cargo,dataRecord.codigo,dataRecord.id_finpartida,dataRecord.finpartida,dataRecord.id_condicion,dataRecord.condicion,dataRecord.id_organigrama,dataRecord.gerencia_administrativa,dataRecord.departamento_administrativo,dataRecord.nivelsalarial,dataRecord.cargo,dataRecord.sueldo);
                        }
                    },
                    { text: '&Iacute;tem/C&oacute;digo', filtertype: 'input', datafield: 'codigo', width: 100},
                    /*{ text: 'Fuente', filtertype: 'checkedlist', datafield: 'finpartida', width: 200},*/
                    { text: 'Condici&oacute;n', filtertype: 'checkedlist', datafield: 'condicion', width: 100},
                    { text: 'Gerencia', filtertype: 'checkedlist', datafield: 'gerencia_administrativa', width: 150},
                    { text: 'Departamento', filtertype: 'checkedlist', datafield: 'departamento_administrativo', width: 150},
                    { text: 'Nivel Salarial', filtertype: 'checkedlist', datafield: 'nivelsalarial', width: 150},
                    { text: 'Cargo', columntype: 'textbox', filtertype: 'input', datafield: 'cargo', width: 150 },
                    { text: 'Haber', filtertype: 'checkedlist', datafield: 'sueldo', width: 150},
                ]
            });
    }
}
/**
 * Función para la carga del combo de ubicaciones de trabajo (Oficinas o Paradas de Línea).
 * @param idUbicacionPredeterminada Identificador de la ubicación de la oficina o Parada de Línea en la cual trabajará el empleado.
 */
function cargarUbicaciones(idUbicacionPredeterminada){
    var ubicacion = [
        { value: 1, label: "OFICINA CENTRAL" },
        { value: 2, label: "LÍNEA ROJA" },
        { value: 3, label: "LÍNEA AMARILLA" },
        { value: 4, label: "LÍNEA VERDE" },
    ];
    $("#ubicacion").jqxComboBox({ selectedIndex:0,autoComplete:true,enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione una ubicacion", source: ubicacion, height: 22, width: '100%' });
}

/**
 * Función para cargar los departamentos en el combo especificado.
 * @param idDepartamentoPrefijado Identificador del departamento prefijado por defecto.
 */
function cargarDepartamentos(idDepartamentoPrefijado){
    var departamento = [
        { value: 0, label: "La Paz" },
        { value: 1, label: "Cochabamba" },
        { value: 2, label: "Sucre" },
        { value: 3, label: "Oruro" },
        { value: 4, label: "Potosí" },
        { value: 5, label: "Santa Cruz" },
        { value: 6, label: "Tarija" },
        { value: 7, label: "Trinidad" },
        { value: 8, label: "Cobija" }
    ];

    $("#departamento").jqxComboBox({ enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione un departamento o ciudad", source: departamento, height: 22, width: '100%' });
}
/**
 * Función para cargar el combo de áreas en caso de existir para el organigrama correspondiente al cargo.
 * @param idPadre Identificador del organigrama padre del cual se desea conocer las áreas disponibles.
 */
function cargarAreasAdministrativas(idPadre,idAreaPredeterminada){
    $('#divAreas').hide();
    $('#lstAreas').html("");
    var ok=false;
    var selected = "";
    if(idPadre>0){
        $.ajax({
            url:'/relaborales/listareas',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id_padre:idPadre
            },
            success: function(data) {
                var res = jQuery.parseJSON(data);
                if(res.length>0){
                    $('#divAreas').show();
                    $('#lstAreas').append("<option value='0'>Seleccionar..</option>");
                    $.each( res, function( key, val ) {
                        ok=true;
                        if(idAreaPredeterminada==val.id_area)selected="selected";else selected="";
                        $('#lstAreas').append("<option value="+val.id_area+" "+selected+">"+val.unidad_administrativa+"</option>");
                    });
                }
            }
        });
    }
    return ok;
}
/**
 * Función para cargar el combo de procesos de acuerdo al financiamiento seleccionado de acuerdo al cargo.
 * @param idFinPartida Identificador del registro de financiamiento por partida.
 * @param idProcesoPrefijado Identificador del proceso prefijado por defecto.
 */
function cargarProcesos(idCondicion){
    $.ajax({
        url:'/relaborales/listprocesos',
        type:'POST',
        datatype: 'json',
        data:{id_condicion:idCondicion
        },
        success: function(data) {
            var res = jQuery.parseJSON(data);
            $('#lstProcesos').html("");
            $('#lstProcesos').append("<option value='0'>Seleccionar..</option>");
            $.each( res, function( key, valo ) {
                $('#lstProcesos').append("<option value="+valo.id+">"+valo.codigo_proceso+"</option>");
            });
        }
    });
}
function cargaCategorias(idCategoriaPredeterminada){
    var categoria = [
        { value: 1, label: "ADMINISTRATIVO" },
        { value: 2, label: "TECNICO" },
        { value: 3, label: "JURIDICO" },
    ];

    $("#categoria").jqxComboBox({ enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione una categoria", source: categoria, height: 22, width: '100%' });
}
/**
 * Función para la definición de las fechas para el registro de la relación laboral.
 */
function defineFechas(){
    $("#FechaIni").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
    $("#FechaIncor").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
}
/**
 * Función para agregar un cargo a la grilla correspondiente para determinar donde trabajará la persona.
 * @param id_cargo Identificador del cargo.
 * @param codigo Código del cargo seleccionado.
 * @param finpartida Financiamiento por partida.
 * @param condicion Condición de contrato / relación laboral.
 * @param gerencia_administrativa Gerencia Administrativa a la cual corresponde el cargo.
 * @param departamento_administrativo Departamento administrativo al cual corresponde el cargo.
 * @param nivelsalarial Nivel salarial correspondiente para el cargo.
 * @param cargo Nombre del cargo.
 * @param haber Haber mensual para el cargo.
 */
function agregarCargoSeleccionadoEnGrilla(id_cargo,codigo,id_finpartida,finpartida,id_condicion,condicion,id_organigrama,gerencia_administrativa,departamento_administrativo,nivelsalarial,cargo,haber){
    $("#tr_cargo_seleccionado").html("");
    var btnDescartar = "<td  class='text-center'><a class='btn btn-danger btnDescartarCargoSeleccionado' title='Descartar cargo seleccionado.' data-toggle='tooltip' data-original-title='Descartar' id='btn_"+id_cargo+"' alt='Descartar cargo para el contrato'>";
    btnDescartar += "<i class='fa fa-times'></i></a></td>";
    //var grilla = "<td>"+codigo+"</td><td>"+finpartida+"</td><td>"+condicion+"</td><td>"+gerencia_administrativa+"</td><td>"+departamento_administrativo+"</td><td>"+nivelsalarial+"</td><td>"+cargo+"</td><td>"+haber+"</td>";
    var grilla = "<td class='text-center'>"+codigo+"</td><td class='text-center'>"+condicion+"</td><td>"+gerencia_administrativa+
        "</td><td>"+departamento_administrativo+"</td><td>"+nivelsalarial+"</td><td>"+cargo+"</td><td  class='text-right'>"+haber+"</td>";
    $("#tr_cargo_seleccionado").append(btnDescartar+grilla);
    $("#hdnIdCargoNuevoSeleccionado").val(id_cargo);
    $("#hdnIdOrganigramaSeleccionado").val(id_organigrama);
    $("#hdnIdCondicionNuevaSeleccionada").val(id_condicion);
    $("#divProcesos").show();
    var okArea = cargarAreasAdministrativas(id_organigrama,0);
    cargarProcesos(id_condicion);
    $("#popupWindowCargo").jqxWindow('close');
    id_condicion = parseInt(id_condicion);
    /**
     * Un número de contrato es requerido si es eventual o consultor
     */
    if(id_condicion==2||id_condicion==3){
        $("#divNumContratos").show();
        if(!okArea)$("#txtNumContrato").focus();
        else $("#lstAreas").focus();
        $("#divFechasFin").show();
        $("#FechaFin").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
    }else{
        if(!okArea)$("#lstUbicaciones").focus();
        else $("#lstAreas").focus();
    }
    $(".btnDescartarCargoSeleccionado").click(function(){
        $("#tr_cargo_seleccionado").html("");
        $("#hdnIdCargoNuevoSeleccionado").val(0);
        $("#hdnIdOrganigramaSeleccionado").val(0);
        $("#hdnIdCondicionNuevaSeleccionada").val(0);
        //$("#divItems").hide();
        $("#divNumContratos").hide();
        $("#divProcesos").hide();
        $("#divFechasFin").hide();
        $(".msjs-alert").hide();
        $(".div-new-relab").removeClass('has-error');
        $("#helpErrorUbicaciones").html("");
        $("#helpErrorProcesos").html("");
        $("#helpErrorCategorias").html("");
        $("#divUbicaciones").removeClass("has-error");
        $("#divProcesos").removeClass("has-error");
        $("#divCategorias").removeClass("has-error");
    });
}
/**
 * Función para la habilitación de los campos correspondientes en el formulario de registro de una nueva relación laboral.
 * @param idOrganigrama Identificador del organigrama.
 * @param idFinPartida Identificador del financiamiento por partida.
 */
function habilitarCamposParaNuevoRegistroDeRelacionLaboral(idOrganigrama,idFinPartida){
    defineFechas();
}
/**
 * Función para deshabilitar los campos correspondientes en el formulario de registro de una nueva relación laboral.
 */
function deshabilitarCamposParaNuevoRegistroDeRelacionLaboral(){
    $("#tr_cargo_seleccionado").html("");
    $("#hdnIdPersonaSeleccionada").val(0);
    $("#NombreParaNuevoRegistro").html("");
}
/**
 * Función para validar los datos del formulario de nuevo registro de relación laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorNuevoRegistro(){
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    $("#helpErrorUbicaciones").html("");
    $("#helpErrorProcesos").html("");
    $("#helpErrorCategorias").html("");
    $("#helpErrorItems").html("");
    $("#helpErrorNumContratos").html("");
    $("#helpErrorFechasIni").html("");
    $("#helpErrorFechasIncor").html("");
    $("#helpErrorFechasFin").html("");
    $("#divUbicaciones").removeClass("has-error");
    $("#divProcesos").removeClass("has-error");
    $("#divCategorias").removeClass("has-error");
    $("#divItems").removeClass("has-error");
    $("#divNumContratos").removeClass("has-error");
    $("#divFechasIni").removeClass("has-error");
    $("#divFechasIncor").removeClass("has-error");
    $("#divFechasFin").removeClass("has-error");
    var id_condicion = $("#hdnIdCondicionNuevaSeleccionada").val();
    id_condicion = parseInt(id_condicion);
    var ubicacion = $("#lstUbicaciones").val();
    var proceso = $("#lstProcesos").val();
    var categoria = $("#lstCategorias").val();
    var fechaIni = $("#FechaIni").jqxDateTimeInput('getText');
    var fechaIncor = $("#FechaIncor").jqxDateTimeInput('getText');
    var fechaFin = null;
    /**
     * Sólo para el caso de condición consultor será necesario registrar la fecha de finalización
     */
    if(id_condicion==2||id_condicion==3){
        var fechaFin = $("#FechaFin").jqxDateTimeInput('getText');
    }
    var idCargo = $("#hdnIdCargoNuevoSeleccionado").val();
    if(idCargo==0||idCargo==null){
        $("#divMsjeError").show();
        $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
        $("#aMsjeError").html("Debe seleccionar el cargo necesariamente.");
        ok=false;
    }
    id_condicion = parseInt(id_condicion);
    var enfoque=null;
    if(fechaIni==null||fechaIni==""){
        ok=false;
        msje = "Debe introducir la fecha de inicio.";
        $("#divFechasIni").addClass("has-error");
        $("#helpErrorFechasIni").html(msje);
        if(enfoque==null)enfoque =$("#FechaIni");
    }
    if(fechaIncor==null||fechaIncor==""){
        ok=false;
        msje = "Debe introducir la fecha de incorporaci&oacute;n.";
        $("#divFechasIncor").addClass("has-error");
        $("#helpErrorFechasIncor").html(msje);
        if(enfoque==null)enfoque =$("#FechaIncor");
    }
    var sep='-';
    if(procesaTextoAFecha(fechaIncor,sep)<procesaTextoAFecha(fechaIni,sep)){
        ok=false;
        msje = "La fecha de incorporaci&oacute;n debe ser igual o superior a la fecha de inicio.";
        $("#divFechasIni").addClass("has-error");
        $("#divFechasIncor").addClass("has-error");
        $("#helpErrorFechasIni").html(msje);
        $("#helpErrorFechasIncor").html(msje);
        if(enfoque==null)enfoque =$("#FechaIni");
    }
    if(id_condicion==2||id_condicion==3){
        if(fechaFin==""||fechaFin==null){
            ok=false;
            msje = "Debe introducir la fecha de finalizaci&oacute;n del contrato.";
            $("#divFechasFin").show();
            $("#divFechasFin").addClass("has-error");
            $("#helpErrorFechasFin").html(msje);
            if(enfoque==null)enfoque =$("#FechaFin");
        }
        var sep='-';
        if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIni,sep)){
            ok=false;
            msje = "La fecha de inicio no puede ser superior a la fecha de finalizaci&oacute;n.";
            $("#divFechasIni").show();
            $("#divFechasIni").addClass("has-error");
            $("#helpErrorFechasIni").html(msje);
            $("#divFechasFin").show();
            $("#divFechasFin").addClass("has-error");
            $("#helpErrorFechasFin").html(msje);
            if(enfoque==null)enfoque =$("#FechaFin");
        }
        if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIncor,sep)){
            ok=false;
            msje = "La fecha de incorporaci&oacute;n no puede ser superior a la fecha de finalizaci&oacute;n.";
            $("#divFechasIncor").show();
            $("#divFechasIncor").addClass("has-error");
            $("#helpErrorFechasIncor").html(msje);
            $("#divFechasFin").show();
            $("#divFechasFin").addClass("has-error");
            $("#helpErrorFechasFin").html(msje);
            if(enfoque==null)enfoque =$("#FechaFin");
        }
    }
    /**
     * Se procede al control del número de contrato para personal eventual y consultor de línea.
     */
    if(id_condicion==2||id_condicion==3){
        if($("#txtNumContrato").val()==null||$("#txtNumContrato").val()==""){
            ok=false;
            msje = "Debe introducir en n&uacute;mero de contrato necesariamente.";
            $("#divNumContratos").addClass("has-error");
            $("#helpErrorNumContratos").html(msje);
            if(enfoque==null)enfoque =$("#txtNumContrato");
        }
        if(fechaFin==null||fechaFin==""){
            ok=false;
            msje = "Debe introducir la fecha de finalizaci&oacute;n del contrato.";
            $("#divFechasFin").addClass("has-error");
            $("#helpErrorFechasFin").html(msje);
            if(enfoque==null)enfoque =$("#FechaFin");
        }
    }
    /*switch (id_condicion){
        case 1:
            if($("#txtItem").val()==null||$("#txtItem").val()==""){
                ok=false;
                msje = "Debe introducir en n&uacute;mero de &iacute;tem necesariamente.";
                $("#divItems").addClass("has-error");
                $("#helpErrorItems").html(msje);
                if(enfoque==null)enfoque =$("#txtItem");
            }
            break;
        case 2:
        case 3:
            if($("#txtNumContrato").val()==null||$("#txtNumContrato").val()==""){
                ok=false;
                msje = "Debe introducir en n&uacute;mero de contrato necesariamente.";
                $("#divNumContratos").addClass("has-error");
                $("#helpErrorNumContratos").html(msje);
                if(enfoque==null)enfoque =$("#txtNumContrato");
            }
            break;
    }*/
    if(ubicacion==""||ubicacion==null){
        ok=false;
        msje = "Debe seleccionar la ubicaci&oacute;n de trabajo necesariamente.";
        $("#divUbicaciones").addClass("has-error");
        $("#helpErrorUbicaciones").html(msje);
        if(enfoque==null)enfoque =$("#lstUbicaciones");
    }
    if(proceso==0||proceso==""||proceso==null){
        ok=false;
        msje = "Debe seleccionar el proceso correspondiente necesariamente.";
        $("#divProcesos").addClass("has-error");
        $("#helpErrorProcesos").html(msje);
        if(enfoque==null)enfoque =$("#lstProcesos");
    }
    /*if(categoria==""||categoria==null){
        ok=false;
        msje = "Debe seleccionar la categor&iacute;a necesariamente.";
        $("#divCategorias").addClass("has-error");
        $("#helpErrorCategorias").html(msje);
        if(enfoque==null)enfoque =$("#lstCategorias");
    }*/
    $('#formNuevo').jqxValidator( { focus: false } );
    $('#formNuevo').jqxValidator({
        hintType: 'label',
        rules: [
            { input: '#FechaIni', message: 'Debe registrar la fecha de inicio!', action: 'keyup, blur', rule: 'required' },
            { input: '#FechaIncor', message: 'Debe registrar la fecha de incorporación!', action: 'keyup, blur', rule: 'required' },
            { input: '#FechaFin', message: 'Debe registrar la fecha de finalización!', action: 'keyup, blur', rule: 'required' }
        ]
    });
    if(enfoque!=null){
        enfoque.focus();
    }

    //if(categoria==null||categoria==""){
    //    ok=false;
    //    msje = "Debe seleccionar la categoria necesariamente.";
    //
    //}
    //if(fechaIni==""||fechaIni==null){
    //    ok=false;
    //    msje = "Debe registrar la Fecha de Inicio necesariamente.";
    //}
    //if(fechaIncor==""||fechaIncor==null){
    //    ok=false;
    //    msje = "Debe registrar la Fecha de Incorporaci&oacute;n necesariamente.";
    //}
    //if(fechaFin == ""||fechaFin == null){
    //    ok=false;
    //    msje = "Debe registrar la Fecha de Finalizaci&oacute;n necesariamente.";
    //}
    //alert(msje);
    return ok;
}
/**
 * Función para el almacenamiento de un nuevo registro en la Base de Datos.
 */
function guardarNuevoRegistro(){
    var ok=true;
    var item=0;
    var idArea = 0;
    /*
        Si se ha definido la opción de registro de áreas
     */
    if($("#lstAreas").val()!=null){
        idArea =$("#lstAreas").val();
    }
    var idRegional = 1;
    var idPersona = $("#hdnIdPersonaSeleccionada").val();
    var idCargo = $("#hdnIdCargoNuevoSeleccionado").val();
    var idUbicacion = $('#lstUbicaciones').val();
    var idProceso = $('#lstProcesos').val();
    //var idCategoria = $('#lstCategorias').val();
    var idCondicion = $("#hdnIdCondicionNuevaSeleccionada").val();
    var numContrato=  '';
    //Si la condición de la relación laboral es consultoría se requiere que se llene el campo del número de contrato.
    var fechaFin=null;
    if(idCondicion==2||idCondicion==3){
        numContrato =  $("#txtNumContrato").val();
        var fechaFin = $('#FechaFin').jqxDateTimeInput('getText');
    }
    var fechaIni = $('#FechaIni').jqxDateTimeInput('getText');
    var fechaIncor = $('#FechaIncor').jqxDateTimeInput('getText');
    var observacion = $("#txtObservacion").val();
    if(idPersona>0&&idCargo>0){
        var ok=$.ajax({
            url:'../../relaborales/save/',
            type:"POST",
            datatype: 'json',
            async:false,
            cache:false,
            data:{id:0,
                id_persona:idPersona,
                id_cargo:idCargo,
                num_contrato:numContrato,
                id_area:idArea,
                id_ubicacion:idUbicacion,
                id_regional:idRegional,
                id_proceso:idProceso,
                fecha_inicio:fechaIni,
                fecha_incor:fechaIncor,
                fecha_fin:fechaFin,
                observacion:observacion
            },
            success: function(data) {  //alert(data);

                var res = jQuery.parseJSON(data);
                /**
                 * Si se ha realizado correctamente el registro de la relación laboral
                 */
                $(".msjes").hide();
                if(res.result==1){
                    $("#divMsjeExito").show();
                    $("#divMsjeExito").addClass('alert alert-success alert-dismissable');
                    $("#aMsjeExito").html(res.msj);
                    /**
                     * Se habilita nuevamente el listado actualizado con el registro realizado y
                     * se inhabilita el formulario para nuevo registro.
                     */
                    $('#jqxTabs').jqxTabs('enableAt', 0);
                    $('#jqxTabs').jqxTabs('disableAt', 1);
                    deshabilitarCamposParaNuevoRegistroDeRelacionLaboral();
                    $("#jqxgrid").jqxGrid("updatebounddata");
                } else if(res.result==0){
                    /**
                     * En caso de haberse presentado un error al momento de especificar la ubicación del trabajo
                     */
                    $("#divMsjePeligro").show();
                    $("#divMsjePeligro").addClass('alert alert-warning alert-dismissable');
                    $("#aMsjePeligro").html(res.msj);
                }else{
                    /**
                     * En caso de haberse presentado un error crítico al momento de registrarse la relación laboral
                     */
                    $("#divMsjeError").show();
                    $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
                    $("#aMsjeError").html(res.msj);
                }

            }, //mostramos el error
            error: function() { alert('Se ha producido un error Inesperado'); }
        });
    }else {
        ok = false;
    }
    return ok;
}