/*
 *   Oasis - Sistema de Gestión para Recursos Humanos
 *   Empresa Estatal de Transporte por Cable "Mi Teleférico"
 *   Versión:  1.0.0
 *   Usuario Creador: Lic. Javier Loza
 *   Fecha Creación:  27-10-2014
 */
/**
 * Función para definir el contenido de la grilla de cargos acéfalos en el formularión de edición de acuerdo a los datos enviados como parámetros.
 */
function definirGrillaParaSeleccionarCargoAcefaloParaEditar(numCertificacion,codCargo){

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
    cargarRegistrosDeCargosParaEditar();
    function cargarRegistrosDeCargosParaEditar(){
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
                        agregarCargoSeleccionadoEnGrillaParaEditar(dataRecord.id_cargo,dataRecord.codigo,dataRecord.id_finpartida,dataRecord.finpartida,dataRecord.id_condicion,dataRecord.condicion,dataRecord.id_organigrama,dataRecord.gerencia_administrativa,dataRecord.departamento_administrativo,0,dataRecord.nivelsalarial,dataRecord.cargo,dataRecord.sueldo);
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
function cargarUbicacionesParaEditar(idUbicacionPredeterminada){
    $('#lstUbicacionesEditar').html("");
    $.ajax({
        url:'../../relaborales/listubicaciones',
        type:'POST',
        datatype: 'json',
        cache:false,
        async:false,
        success: function(data) {
            var res = jQuery.parseJSON(data);
            $.each( res, function( key, valo ) {
                if(idUbicacionPredeterminada==valo.id){$selected='selected';}else{ $selected='';}
                $('#lstUbicacionesEditar').append("<option value="+valo.id+" "+$selected+">"+valo.ubicacion+"</option>");
            });
        }
    });
}
/**
 * Función para cargar los departamentos en el combo especificado.
 * @param idDepartamentoPrefijado Identificador del departamento prefijado por defecto.
 */
function cargarDepartamentosParaEditar(idDepartamentoPrefijado){
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

    $("#departamentoEditar").jqxComboBox({ enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione un departamento o ciudad", source: departamento, height: 22, width: '100%' });
}
/**
 * Función para cargar el combo de áreas en caso de existir para el organigrama correspondiente al cargo.
 * @param idPadre Identificador del organigrama padre del cual se desea conocer las áreas disponibles.
 * @param idAreaPredeterminada Identificador del área que ya tenía registro.
 */
function cargarAreasAdministrativasParaEditar(idPadre,idAreaPredeterminada){
    $('#divAreasEditar').hide();
    $('#lstAreasEditar').html("");
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
                    $('#divAreasEditar').show();
                    $('#lstAreasEditar').append("<option value='0'>Seleccionar..</option>");
                    $.each( res, function( key, val ) {
                        ok=true;
                        if(idAreaPredeterminada==val.id_area)selected="selected";else selected="";
                        $('#lstAreasEditar').append("<option value="+val.id_area+" "+selected+">"+val.unidad_administrativa+"</option>");
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
function cargarProcesosParaEditar(idCondicion,idProcesoPrefijado){
    var lstProcesos=$.ajax({
        url:'../../relaborales/listprocesos',
        type:'POST',
        datatype: 'json',
        data:{id_condicion:idCondicion
        },
        success: function(data) {
            var res = jQuery.parseJSON(data);
            $('#lstProcesosEditar').html("");
            $.each( res, function( key, valo ) {
                if(idProcesoPrefijado==valo.id){$selected='selected';}else{ $selected='';}
                $('#lstProcesosEditar').append("<option value="+valo.id+" "+$selected+">"+valo.codigo_proceso+"</option>");
            });
        }
    });
}
function cargaCategoriasParaEditar(idCategoriaPredeterminada){
    var categoria = [
        { value: 1, label: "ADMINISTRATIVO" },
        { value: 2, label: "TECNICO" },
        { value: 3, label: "JURIDICO" },
    ];

    $("#categoriaEditar").jqxComboBox({ enableBrowserBoundsDetection: true, autoDropDownHeight: true, promptText: "Seleccione una categoria", source: categoria, height: 22, width: '100%' });
}

/**
 * Función para agregar un cargo registrado a la grilla correspondiente para determinar donde trabajará la persona.
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
function agregarCargoSeleccionadoEnGrillaParaEditar(id_cargo,codigo,id_finpartida,finpartida,id_condicion,condicion,id_organigrama,gerencia_administrativa,departamento_administrativo,id_area,nivelsalarial,cargo,haber){
    $("#tr_cargo_seleccionado_editar").html("");
    var btnDescartar = "<td class='text-center'><a class='btn btn-danger btnDescartarCargoSeleccionadoEditar' title='Descartar cargo seleccionado.' data-toggle='tooltip' data-original-title='Descartar' id='btn_editar_"+id_cargo+"' alt='Descartar cargo para el contrato'>";
    btnDescartar += "<i class='fa fa-times'></i></a></td>";
    //var grilla = "<td>"+codigo+"</td><td>"+finpartida+"</td><td>"+condicion+"</td><td>"+gerencia_administrativa+"</td><td>"+departamento_administrativo+"</td><td>"+nivelsalarial+"</td><td>"+cargo+"</td><td>"+haber+"</td>";
    var grilla = "<td class='text-center'>"+codigo+"</td><td class='text-center'>"+condicion+"</td><td>"+gerencia_administrativa+"</td><td>"+departamento_administrativo+"</td><td>"+nivelsalarial+"</td><td>"+cargo+"</td><td class='text-center'>"+haber+"</td>";
    $("#tr_cargo_seleccionado_editar").append(btnDescartar+grilla);
    $("#hdnIdCargoSeleccionadoEditar").val(id_cargo);
    $("#hdnIdOrganigramaSeleccionadoEditar").val(id_organigrama);
    $("#hdnIdCondicionEditableSeleccionada").val(id_condicion);
    $("#popupWindowCargo").jqxWindow('close');
    $("#divProcesosEditar").show();
    var okArea = cargarAreasAdministrativasParaEditar(id_organigrama,id_area);
    id_condicion = parseInt(id_condicion);
    cargarProcesosParaEditar(id_condicion,0);
    if(id_condicion==2||id_condicion==3){
        $("#divNumContratosEditar").show();
        $("#divFechasFinEditar").show();
        $("#FechaFinEditar").jqxDateTimeInput({ enableBrowserBoundsDetection: true, height: 24, formatString:'dd-MM-yyyy' });
        $("#txtNumContratoEditar").focus();
    }else{
        $("#lstUbicacionesEditar").focus();
    }
    $(".btnDescartarCargoSeleccionadoEditar").click(function(){
        $("#tr_cargo_seleccionado_editar").html("");
        $("#hdnIdCargoSeleccionadoEditar").val(0);
        $("#hdnIdOrganigramaSeleccionadoEditar").val(0);
        $("#hdnIdCondicionNuevaSeleccionadaEditar").val(0);
        $("#hdnIdRelaboral").val(0);
        //$("#divItems").hide();
        $("#divProcesosEditar").hide();
        $("#divNumContratosEditar").hide();
        $("#divFechasFinEditar").hide();
        $(".msjs-alert").hide();
        $(".div-edit-relab").removeClass('has-error');
        $("#helpErrorUbicacionesEditar").html("");
        $("#helpErrorProcesosEditar").html("");
        $("#helpErrorCategoriasEditar").html("");
        $("#divUbicacionesEditar").removeClass("has-error");
        $("#divProcesosEditar").removeClass("has-error");
        $("#divCategoriasEditar").removeClass("has-error");
        //deshabilitarCamposParaEditarRegistroDeRelacionLaboral(id_organigrama,id_finpartida);
    });
}
/**
 * Función para deshabilitar los campos correspondientes en el formulario de registro de una nueva relación laboral.
 */
function deshabilitarCamposParaEditarRegistroDeRelacionLaboral(){
    $("#tr_cargo_seleccionado_editar").html("");
    $("#hdnIdPersonaSeleccionadaEditar").val(0);
    $("#NombreParaEditarRegistro").html("");
}
/**
 * Función para validar los datos del formulario de nuevo registro de relación laboral.
 * @returns {boolean} True: La validación fue correcta; False: La validación anuncia que hay errores en el formulario.
 */
function validaFormularioPorEditarRegistro(){
    var ok = true;
    var msje = "";
    $(".msjs-alert").hide();
    $("#helpErrorUbicacionesEditar").html("");
    $("#helpErrorProcesosEditar").html("");
    $("#helpErrorCategoriasEditar").html("");
    $("#helpErrorItemsEditar").html("");
    $("#helpErrorNumContratosEditar").html("");
    $("#helpErrorFechasIniEditar").html("");
    $("#helpErrorFechasIncorEditar").html("");
    $("#helpErrorFechasFinEditar").html("");
    $("#divUbicacionesEditar").removeClass("has-error");
    $("#divProcesosEditar").removeClass("has-error");
    $("#divCategoriasEditar").removeClass("has-error");
    $("#divItemsEditar").removeClass("has-error");
    $("#divNumContratosEditar").removeClass("has-error");
    $("#divFechasIniEdiar").removeClass("has-error");
    $("#divFechasIncorEditar").removeClass("has-error");
    $("#divFechasFinEditar").removeClass("has-error");
    var id_condicion = $("#hdnIdCondicionEditableSeleccionada").val();
    id_condicion = parseInt(id_condicion);
    var ubicacion = $("#lstUbicacionesEditar").val();
    var proceso = $("#lstProcesosEditar").val();
    var categoria = $("#lstCategoriasEditar").val();
    var fechaIni = $("#FechaIniEditar").jqxDateTimeInput('getText');
    var fechaIncor = $("#FechaIncorEditar").jqxDateTimeInput('getText');
    var fechaFin = null;
    /**
     * Sólo para el caso de condición consultor será necesario registrar la fecha de finalización
     */
    if(id_condicion==2||id_condicion==3){
        var fechaFin = $("#FechaFinEditar").jqxDateTimeInput('getText');
    }
    var idCargo = $("#hdnIdCargoSeleccionadoEditar").val();
    var idRelaboral = $("#hdnIdRelaboralEditar").val();
    var msjeError="";
    if(idRelaboral==0||idRelaboral==null){
        $("#divMsjeError").show();
        $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
        msjeError += "Se requiere seleccionar un registro de relaci&oacute;n laboral inicialmente.";
        ok=false;
    }
    if(idCargo==0||idCargo==null){
        $("#divMsjeError").show();
        $("#divMsjeError").addClass('alert alert-danger alert-dismissable');
        if(msjeError!="")msjeError+="<br>";
        msjeError += "Debe seleccionar el cargo necesariamente.";
        ok=false;
    }
    if(msjeError!="")$("#aMsjeError").html(msjeError);

    id_condicion = parseInt(id_condicion);
    var enfoque=null;
    if(fechaIni==null||fechaIni==""){
        ok=false;
        msje = "Debe introducir la fecha de inicio.";
        $("#divFechasIniEditar").addClass("has-error");
        $("#helpErrorFechasIniEditar").html(msje);
        if(enfoque==null)enfoque =$("#FechaIni");
    }
    if(fechaIncor==null||fechaIncor==""){
        ok=false;
        msje = "Debe introducir la fecha de incorporaci&oacute;n.";
        $("#divFechasIncorEditar").addClass("has-error");
        $("#helpErrorFechasIncorEditar").html(msje);
        if(enfoque==null)enfoque =$("#FechaIncorEditar");
    }
    var sep='-';
    if(procesaTextoAFecha(fechaIncor,sep)<procesaTextoAFecha(fechaIni,sep)){
        ok=false;
        msje = "La fecha de incorporaci&oacute;n debe ser igual o superior a la fecha de inicio.";
        $("#divFechasIniEditar").addClass("has-error");
        $("#divFechasIncorEditar").addClass("has-error");
        $("#helpErrorFechasIniEditar").html(msje);
        $("#helpErrorFechasIncorEditar").html(msje);
        if(enfoque==null)enfoque =$("#FechaIniEditar");
    }
    if(id_condicion==2||id_condicion==3){
        if(fechaFin==""||fechaFin==null){
            ok=false;
            msje = "Debe introducir la fecha de finalizaci&oacute;n del contrato.";
            $("#divFechasFinEditar").show();
            $("#divFechasFinEditar").addClass("has-error");
            $("#helpErrorFechasFinEditar").html(msje);
            if(enfoque==null)enfoque =$("#FechaFinEditar");
        }
        if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIni,sep)){
            ok=false;
            msje = "La fecha de inicio no puede ser superior a la fecha de finalizaci&oacute;n.";
            $("#divFechasIniEditar").show();
            $("#divFechasIniEditar").addClass("has-error");
            $("#helpErrorFechasIniEditar").html(msje);
            $("#divFechasFinEditar").show();
            $("#divFechasFinEditar").addClass("has-error");
            $("#helpErrorFechasFinEditar").html(msje);
            if(enfoque==null)enfoque =$("#FechaFinEditar");
        }
        if(procesaTextoAFecha(fechaFin,sep)<procesaTextoAFecha(fechaIncor,sep)){
            ok=false;
            msje = "La fecha de incorporaci&oacute;n no puede ser superior a la fecha de finalizaci&oacute;n.";
            $("#divFechasIncorEditar").show();
            $("#divFechasIncorEditar").addClass("has-error");
            $("#helpErrorFechasIncorEditar").html(msje);
            $("#divFechasFinEditar").show();
            $("#divFechasFinEditar").addClass("has-error");
            $("#helpErrorFechasFinEditar").html(msje);
            if(enfoque==null)enfoque =$("#FechaFinEditar");
        }
    }
    /**
     * Se procede al control del número de contrato para personal eventual y consultor de línea.
     */
    if(id_condicion==2||id_condicion==3){
        if($("#txtNumContratoEditar").val()==null||$("#txtNumContratoEditar").val()==""){
            ok=false;
            msje = "Debe introducir en n&uacute;mero de contrato necesariamente.";
            $("#divNumContratosEditar").addClass("has-error");
            $("#helpErrorNumContratosEditar").html(msje);
            if(enfoque==null)enfoque =$("#txtNumContratoEditar");
        }
        if(fechaFin==null||fechaFin==""){
            ok=false;
            msje = "Debe introducir la fecha de finalizaci&oacute;n del contrato.";
            $("#divFechasFinEditar").addClass("has-error");
            $("#helpErrorFechasFinEditar").html(msje);
            if(enfoque==null)enfoque =$("#FechaFinEditar");
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
        $("#divUbicacionesEditar").addClass("has-error");
        $("#helpErrorUbicacionesEditar").html(msje);
        if(enfoque==null)enfoque =$("#lstUbicacionesEditar");
    }
    if(proceso==0||proceso==""||proceso==null){
        ok=false;
        msje = "Debe seleccionar el proceso correspondiente necesariamente.";
        $("#divProcesosEditar").addClass("has-error");
        $("#helpErrorProcesosEditar").html(msje);
        if(enfoque==null)enfoque =$("#lstProcesosEditar");
    }
    /*if(categoria==""||categoria==null){
     ok=false;
     msje = "Debe seleccionar la categor&iacute;a necesariamente.";
     $("#divCategorias").addClass("has-error");
     $("#helpErrorCategorias").html(msje);
     if(enfoque==null)enfoque =$("#lstCategorias");
     }*/
    /*$('#formEditar').jqxValidator( { focus: false } );
    $('#formEditar').jqxValidator({
        hintType: 'label',
        rules: [
            { input: '#FechaIniEditar', message: 'Debe registrar la fecha de inicio!', action: 'keyup, blur', rule: 'required' },
            { input: '#FechaIncorEditar', message: 'Debe registrar la fecha de incorporación!', action: 'keyup, blur', rule: 'required' },
            { input: '#FechaFinEditar', message: 'Debe registrar la fecha de finalización!', action: 'keyup, blur', rule: 'required' }
        ]
    });*/
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
function guardarRegistroEditado(){
    var ok=true;
    var id_relaboral = $("#hdnIdRelaboralEditar").val();
    var item=0;
    var idArea = 0;
    /*
     Si se ha definido la opción de registro de áreas
     */
    if($("#lstAreasEditar").val()!=null){
        idArea =$("#lstAreasEditar").val();
    }
    var idRegional = 1;
    var idPersona = $("#hdnIdPersonaSeleccionadaEditar").val();
    var idCargo = $("#hdnIdCargoSeleccionadoEditar").val();
    var idUbicacion = $('#lstUbicacionesEditar').val();
    var idProceso = $('#lstProcesosEditar').val();
    //var idCategoria = $('#lstCategorias').val();
    var idCondicion = $("#hdnIdCondicionEditableSeleccionada").val();
    var numContrato=  '';
    //Si la condición de la relación laboral es consultoría se requiere que se llene el campo del número de contrato.
    var fechaFin=null;
    if(idCondicion==2||idCondicion==3){
        numContrato =  $("#txtNumContratoEditar").val();
        var fechaFin = $('#FechaFinEditar').jqxDateTimeInput('getText');
    }
    var fechaIni = $('#FechaIniEditar').jqxDateTimeInput('getText');
    var fechaIncor = $('#FechaIncorEditar').jqxDateTimeInput('getText');
    var observacion = $("#txtObservacionEditar").val();
    if(id_relaboral>0&&idPersona>0&&idCargo>0){
        var ok=$.ajax({
            url:'../../relaborales/save/',
            type:'POST',
            datatype: 'json',
            async:false,
            data:{id:id_relaboral,
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
                    $('#jqxTabs').jqxTabs('disableAt', 2);
                    $('#jqxTabs').jqxTabs('disableAt', 3);
                    deshabilitarCamposParaEditarRegistroDeRelacionLaboral();
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
