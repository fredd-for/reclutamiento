$(document).ready(function () {
        /***********AJAX FORMACION ACADEMICA**************/
        //$("#masked_date").mask("99/99/9999");
        cargarPformaciones();   
        function cargarPformaciones(){
            var source =
            {
                datatype: "json",
                datafields: [
                { name: 'id',type: 'number'},
                { name: 'detalle',type: 'number'},
                { name: 'detalle_text',type: 'string'},
                { name: 'documento_id',type: 'number'},
                { name: 'documento_text',type: 'string'},
                { name: 'gestion',type: 'number'},
                { name: 'institucion',type: 'string'},
                { name: 'grado',type: 'string'},
                { name: 'numero_titulo',type: 'string'},
                { name: 'nombre_rector',type: 'string'},
                { name: 'fecha_emision',type: 'date'}
                ],
                url: '/ppostulantes/listPformaciones/',
                cache: false
            };
            var dataAdapter = new $.jqx.dataAdapter(source);

            $("#jqxgridPformaciones").jqxGrid(
            {
                width: '100%',
                height: '300px',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '5%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Formación Academica', datafield: 'detalle_text', filtertype: 'input',width: '20%' },
                { text: 'Documentos', datafield: 'documento_text', filtertype: 'input',width: '20%' },
                // { text: 'Año', datafield: 'gestion', filtertype: 'number',width: '5%' },
                { text: 'Institución', datafield: 'institucion',filtertype: 'input', width: '20%' },
                { text: 'Grado o Titulo Obtenido', datafield: 'grado',filtertype: 'input', width: '15%' },
                { text: 'Nro Titulo', datafield: 'numero_titulo',filtertype: 'input', width: '8%' },
                { text: 'Fecha Emisión', datafield: 'fecha_emision', filtertype: 'date', width: '12%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align:'center'},

                ]
            });

        }

// update the edited row when the user clicks the 'Save' button.
$("#add_formacion").click(function(){
    $("#titulo").text("Adicionar Formación Academica");
    $("#pformacion_id").val("");
    $("#detalle").val("");
    $("#documento_id").val("0");
    $("#gestion").val("");
    $("#institucion").val("");
    $("#grado").val("");
    $("#numero_titulo").val("");
    $("#fecha_emision").val("");
    $('#myModal_Pformaciones').modal('show');
});

$("#edit_formacion").click(function() {
    $("#titulo").text("Editar Formación Academica");
    var rowindex = $("#jqxgridPformaciones").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPformaciones").jqxGrid('getrowdata', rowindex);
        $("#pformacion_id").val(dataRecord.id);
        $("#detalle").val(dataRecord.detalle);
        $("#documento_id").val(dataRecord.documento_id);
        $("#gestion").val(dataRecord.gestion);
        $("#institucion").val(dataRecord.institucion);
        $("#grado").val(dataRecord.grado);
        $("#numero_titulo").val(dataRecord.numero_titulo);
        var fe = $.jqx.dataFormat.formatdate(dataRecord.fecha_emision, 'dd-MM-yyyy');
        $("#fecha_emision").val(fe);
        $('#myModal_Pformaciones').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_formacion").click(function() {
    var rowindex = $("#jqxgridPformaciones").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPformaciones").jqxGrid('getrowdata', rowindex);
        $("#pformacion_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePformaciones/',
                    type:'POST',
                    datatype: 'json',
                    data:{pformacion_id:$("#pformacion_id").val()},
                        success: function(data) { cargarPformaciones(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

});

jQuery.extend(jQuery.validator.messages, {
    required: "Campo requerido.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

$('#testForm_pformacion').validate({
    rules: {
        detalle: {
            required: true        
        },
        gestion: {
            required: true
        },
        grado: {
            required: true
        },
        numero_titulo: {
            required: true
        },
        fecha_emision: {
            required: true
        },
        institucion: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePformaciones/',
            type:'POST',
            datatype: 'json',
            data:{pformacion_id:$("#pformacion_id").val(),detalle:$("#detalle").val(),documento_id:$("#documento_id").val(),gestion:$("#gestion").val(),institucion:$("#institucion").val(),grado:$("#grado").val(),numero_titulo:$("#numero_titulo").val(),fecha_emision:$("#fecha_emision").val()},
                success: function(data) { cargarPformaciones(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pformaciones').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN FORMACION ACADEMICA**************************/


/***********AJAX EXPERIENCIA LABORAL GENERAL**************/

cargarPexplabgeneral();   
function cargarPexplabgeneral(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'gestion_desde',type: 'number'},
        { name: 'mes_desde',type: 'string'},
        { name: 'desde',type: 'string'},
        { name: 'gestion_hasta',type: 'number'},
        { name: 'mes_hasta',type: 'string'},
        { name: 'hasta',type: 'string'},
        { name: 'cargo',type: 'string'},
        { name: 'empresa',type: 'string'},
        { name: 'motivo_retiro',type: 'string'},
        { name: 'doc_respaldo',type: 'string'}
        ],
        url: '/ppostulantes/listPexplabgeneral/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPexplabgeneral").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Desde', datafield: 'desde', filtertype: 'input',width: '15%' },
                { text: 'Hasta', datafield: 'hasta', filtertype: 'input',width: '15%' },
                { text: 'Cargo', datafield: 'cargo',filtertype: 'input', width: '20%' },
                { text: 'Empresa o Institución', datafield: 'empresa',filtertype: 'input', width: '15%' },
                { text: 'Motivo Retiro', datafield: 'motivo_retiro',filtertype: 'input', width: '18%' },
                { text: 'Documento Respaldo', datafield: 'doc_respaldo',filtertype: 'input', width: '15%' }

                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_explabgeneral").click(function(){
    $("#titulo_explabgeneral").text("Adicionar Experiencia Laboral General");
    $("#pexplabgeneral_id").val("");
    $("#gestion_desde").val("");
    $("#mes_desde").val("");
    $("#gestion_hasta").val("");
    $("#mes_hasta").val("");
    $("#cargo").val("");
    $("#empresa").val("");
    $("#motivo_retiro").val("");
    $("#doc_respaldo").val("");
    $('#myModal_Pexplabgeneral').modal('show');
});

$("#edit_explabgeneral").click(function() {
    $("#titulo_explabgeneral").text("Editar Experiencia Laboral General");
    var rowindex = $("#jqxgridPexplabgeneral").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPexplabgeneral").jqxGrid('getrowdata', rowindex);
        $("#pexplabgeneral_id").val(dataRecord.id);
        $("#gestion_desde").val(dataRecord.gestion_desde);
        $("#mes_desde").val(dataRecord.mes_desde);
        $("#gestion_hasta").val(dataRecord.gestion_hasta);
        $("#mes_hasta").val(dataRecord.mes_hasta);
        $("#cargo").val(dataRecord.cargo);
        $("#empresa").val(dataRecord.empresa);
        $("#motivo_retiro").val(dataRecord.motivo_retiro);
        $("#doc_respaldo").val(dataRecord.doc_respaldo);
        $('#myModal_Pexplabgeneral').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_explabgeneral").click(function() {
    var rowindex = $("#jqxgridPexplabgeneral").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPexplabgeneral").jqxGrid('getrowdata', rowindex);
        $("#pexplabgeneral_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePexplabgeneral/',
                    type:'POST',
                    datatype: 'json',
                    data:{pexplabgeneral_id:$("#pexplabgeneral_id").val()},
                        success: function(data) { cargarPexplabgeneral(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_pexplabgeneral').validate({
    rules: {
        gestion_desde: {
            required: true
        },
        mes_desde: {
            required: true
        },
        gestion_hasta: {
            required: true
        },
        mes_hasta: {
            required: true
        },
        cargo: {
            required: true
        },
        empresa: {
            required: true
        },
        motivo_retiro: {
            required: true
        },
        doc_respaldo: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {

        var v=$.ajax({
            url:'/ppostulantes/savePexplabgeneral/',
            type:'POST',
            datatype: 'json',
            data:{pexplabgeneral_id:$("#pexplabgeneral_id").val(),gestion_desde:$("#gestion_desde").val(),mes_desde:$("#mes_desde").val(),gestion_hasta:$("#gestion_hasta").val(),mes_hasta:$("#mes_hasta").val(),cargo:$("#cargo").val(),empresa:$("#empresa").val(),motivo_retiro:$("#motivo_retiro").val(),doc_respaldo:$("#doc_respaldo").val()},
                success: function(data) { cargarPexplabgeneral(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pexplabgeneral').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN EXPERIENCIA LABORAL GENERAL**************************/

/***********AJAX EXPERIENCIA RELACIONADA AL CARGO**************/

cargarPexplabespecifica();   
function cargarPexplabespecifica(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'gestion_desde',type: 'number'},
        { name: 'mes_desde',type: 'string'},
        { name: 'desde',type: 'string'},
        { name: 'gestion_hasta',type: 'number'},
        { name: 'mes_hasta',type: 'string'},
        { name: 'hasta',type: 'string'},
        { name: 'cargo',type: 'string'},
        { name: 'desc_fun',type: 'string'},
        { name: 'doc_respaldo',type: 'string'},
        { name: 'institucion',type: 'string'},
        { name: 'codigo_proceso',type: 'string'},
        { name: 'seguimiento_id',type: 'number'},
        ],
        url: '/ppostulantes/listPexplabespecifica/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPexplabespecifica").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Puesto', datafield: 'codigo_proceso', filtertype: 'input',width: '15%' },
                { text: 'Desde', datafield: 'desde', filtertype: 'input',width: '10%' },
                { text: 'Hasta', datafield: 'hasta', filtertype: 'input',width: '10%' },
                { text: 'Cargo', datafield: 'cargo',filtertype: 'input', width: '15%' },
                { text: 'Empresa o Institución', datafield: 'institucion',filtertype: 'input', width: '15%' },
                { text: 'Descripción Funciones', datafield: 'desc_fun',filtertype: 'input', width: '18%' },
                { text: 'Documento Respaldo', datafield: 'doc_respaldo',filtertype: 'input', width: '15%' }

                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_explabespecifica").click(function(){
    $("#titulo_explabespecifica").text("Adicionar Experiencia Relacionada al Cargo");
    $("#pexplabespecifica_id").val("");
    $("#gestion_desde_explabesp").val("");
    $("#mes_desde_explabesp").val("");
    $("#gestion_hasta_explabesp").val("");
    $("#mes_hasta_explabesp").val("");
    $("#cargo_explabesp").val("");
    $("#institucion_explabesp").val("");
    $("#desc_fun_explabesp").val("");
    $("#doc_respaldo_explabesp").val("");
    $('#myModal_Pexplabespecifica').modal('show');
});

$("#edit_explabespecifica").click(function() {
    $("#titulo_explabespecifica").text("Editar Experiencia Relacionada al Cargo");
    var rowindex = $("#jqxgridPexplabespecifica").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPexplabespecifica").jqxGrid('getrowdata', rowindex);
        $("#pexplabespecifica_id").val(dataRecord.id);
        $("#gestion_desde_explabesp").val(dataRecord.gestion_desde);
        $("#mes_desde_explabesp").val(dataRecord.mes_desde);
        $("#gestion_hasta_explabesp").val(dataRecord.gestion_hasta);
        $("#mes_hasta_explabesp").val(dataRecord.mes_hasta);
        $("#cargo_explabesp").val(dataRecord.cargo);
        $("#institucion_explabesp").val(dataRecord.institucion);
        $("#pospue_explabesp").val(dataRecord.seguimiento_id);
        $("#doc_respaldo_explabesp").val(dataRecord.doc_respaldo);
        $("#desc_fun_explabesp").val(dataRecord.desc_fun);
        $('#myModal_Pexplabespecifica').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_explabespecifica").click(function() {
    var rowindex = $("#jqxgridPexplabespecifica").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPexplabespecifica").jqxGrid('getrowdata', rowindex);
        $("#pexplabespecifica_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePexplabespecifica/',
                    type:'POST',
                    datatype: 'json',
                    data:{pexplabespecifica_id:$("#pexplabespecifica_id").val()},
                        success: function(data) { cargarPexplabespecifica(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_pexplabespecifica').validate({
    rules: {
        gestion_desde_explabesp: {
            required: true
        },
        mes_desde_explabesp: {
            required: true
        },
        gestion_hasta_explabesp: {
            required: true
        },
        mes_hasta_explabesp: {
            required: true
        },
        cargo_explabesp: {
            required: true
        },
        institucion_explabesp: {
            required: true
        },
        desc_fun_explabesp: {
            required: true
        },
        pospue_explabesp: {
            required: true
        },
        doc_respaldo_explabesp: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        //var element = $("#pospue_explabesp");
         var element = $("#pospue_explabesp").find('option:selected'); 
        var proceso_contratacion_id = element.attr("proceso_contratacion_id"); 
        var seguimiento_id = $("#pospue_explabesp").val();

        var v=$.ajax({
            url:'/ppostulantes/savePexplabespecifica/',
            type:'POST',
            datatype: 'json',
            data:{pexplabespecifica_id:$("#pexplabespecifica_id").val(),gestion_desde:$("#gestion_desde_explabesp").val(),mes_desde:$("#mes_desde_explabesp").val(),gestion_hasta:$("#gestion_hasta_explabesp").val(),mes_hasta:$("#mes_hasta_explabesp").val(),cargo:$("#cargo_explabesp").val(),institucion:$("#institucion_explabesp").val(),desc_fun:$("#desc_fun_explabesp").val(),seguimiento_id:seguimiento_id,proceso_contratacion_id:proceso_contratacion_id,doc_respaldo:$("#doc_respaldo_explabesp").val()},
                success: function(data) { cargarPexplabespecifica(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pexplabespecifica').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN EXPERIENCIA RELACIONADA AL CARGO**************************/


/***********AJAX CURSOS Y SEMINARIOS**************/

cargarPcurso();   
function cargarPcurso(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'gestion',type: 'number'},
        { name: 'institucion',type: 'string'},
        { name: 'nombre_curso',type: 'string'},
        { name: 'duracion_hrs',type: 'number'},
        ],
        url: '/ppostulantes/listPcurso/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPcurso").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Gestión', datafield: 'gestion', filtertype: 'input',width: '10%' },
                { text: 'Institución', datafield: 'institucion', filtertype: 'input',width: '35%' },
                { text: 'Nombre Curso', datafield: 'nombre_curso', filtertype: 'input',width: '40%' },
                { text: 'Duración Horas', datafield: 'duracion_hrs',filtertype: 'input', width: '13%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_curso").click(function(){
    $("#titulo_curso").text("Adicionar Curso o Seminario");
    $("#pcurso_id").val("");
    $("#gestion_curso").val("");
    $("#institucion_curso").val("");
    $("#nombre_curso").val("");
    $("#duracion_hrs_curso").val("");
    $('#myModal_Pcurso').modal('show');
});

$("#edit_curso").click(function() {
    $("#titulo_curso").text("Editar Curso o Seminario");
    var rowindex = $("#jqxgridPcurso").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPcurso").jqxGrid('getrowdata', rowindex);
        $("#pcurso_id").val(dataRecord.id);
        $("#gestion_curso").val(dataRecord.gestion);
        $("#institucion_curso").val(dataRecord.institucion);
        $("#nombre_curso").val(dataRecord.nombre_curso);
        $("#duracion_hrs_curso").val(dataRecord.duracion_hrs);
        $('#myModal_Pcurso').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_curso").click(function() {
    var rowindex = $("#jqxgridPcurso").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPcurso").jqxGrid('getrowdata', rowindex);
        $("#pcurso_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePcurso/',
                    type:'POST',
                    datatype: 'json',
                    data:{pcurso_id:$("#pcurso_id").val()},
                        success: function(data) { cargarPcurso(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_pcurso').validate({
    rules: {
        gestion_curso: {
            required: true
        },
        institucion_curso: {
            required: true
        },
        nombre_curso: {
            required: true
        },
        duracion_hrs_curso: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePcurso/',
            type:'POST',
            datatype: 'json',
            data:{pcurso_id:$("#pcurso_id").val(),gestion:$("#gestion_curso").val(),institucion:$("#institucion_curso").val(),nombre_curso:$("#nombre_curso").val(),duracion_hrs:$("#duracion_hrs_curso").val()},
                success: function(data) { cargarPcurso(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pcurso').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN CURSOS Y SEMINARIOS**************************/

/***********AJAX PAQUETES DE COMPUTACION**************/

cargarPpaquete();   
function cargarPpaquete(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'aplicacion',type: 'string'},
        { name: 'nivel',type: 'string'},
        ],
        url: '/ppostulantes/listPpaquete/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPpaquete").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Paquete o Aplicación', datafield: 'aplicacion', filtertype: 'input',width: '50%' },
                { text: 'Nivel', datafield: 'nivel', filtertype: 'input',width: '48%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_paquete").click(function(){
    $("#titulo_paquete").text("Adicionar Paquete o Aplicación");
    $("#ppaquete_id").val("");
    $("#aplicacion_paquete").val("");
    // $("#nivel_paquete").val("");
    $('#myModal_Ppaquete').modal('show');
});

$("#edit_paquete").click(function() {
    $("#titulo_paquete").text("Editar Paquete o Aplicación");
    var rowindex = $("#jqxgridPpaquete").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPpaquete").jqxGrid('getrowdata', rowindex);
        $("#ppaquete_id").val(dataRecord.id);
        $("#aplicacion_paquete").val(dataRecord.aplicacion);
        $("#nivel_paquete").val(dataRecord.nivel);
        $('#myModal_Ppaquete').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_paquete").click(function() {
    var rowindex = $("#jqxgridPpaquete").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPpaquete").jqxGrid('getrowdata', rowindex);
        $("#ppaquete_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePpaquete/',
                    type:'POST',
                    datatype: 'json',
                    data:{ppaquete_id:$("#ppaquete_id").val()},
                        success: function(data) { cargarPpaquete(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_ppaquete').validate({
    rules: {
        aplicacion_paquete: {
            required: true
        },
        nivel_paquete: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePpaquete/',
            type:'POST',
            datatype: 'json',
            data:{ppaquete_id:$("#ppaquete_id").val(),aplicacion:$("#aplicacion_paquete").val(),nivel:$("#nivel_paquete").val()},
                success: function(data) { cargarPpaquete(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Ppaquete').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN CURSOS Y SEMINARIOS**************************/

/***********AJAX IDIOMAS**************/

cargarPidioma();   
function cargarPidioma(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'idioma',type: 'string'},
        { name: 'lectura',type: 'string'},
        { name: 'escritura',type: 'string'},
        { name: 'conversacion',type: 'string'},
        ],
        url: '/ppostulantes/listPidioma/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPidioma").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Idioma', datafield: 'idioma', filtertype: 'input',width: '53%' },
                { text: 'Lectura', datafield: 'lectura', filtertype: 'input',width: '15%' },
                { text: 'Escritura', datafield: 'escritura', filtertype: 'input',width: '15%' },
                { text: 'Conversación', datafield: 'conversacion', filtertype: 'input',width: '15%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_idioma").click(function(){
    $("#titulo_idioma").text("Adicionar Idioma");
    $("#pidioma_id").val("");
    // $("#idioma").val("");
    // $("#lectura").val("");
    // $("#escritura").val("");
    // $("#conversacion").val("");
    $('#myModal_Pidioma').modal('show');
});

$("#edit_idioma").click(function() {
    $("#titulo_idioma").text("Editar Idioma");
    var rowindex = $("#jqxgridPidioma").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPidioma").jqxGrid('getrowdata', rowindex);
        $("#pidioma_id").val(dataRecord.id);
        $("#idioma").val(dataRecord.idioma);
        $("#lectura").val(dataRecord.lectura);
        $("#escritura").val(dataRecord.escritura);
        $("#conversacion").val(dataRecord.conversacion);
        $('#myModal_Pidioma').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_idioma").click(function() {
    var rowindex = $("#jqxgridPidioma").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPidioma").jqxGrid('getrowdata', rowindex);
        $("#pidioma_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePidioma/',
                    type:'POST',
                    datatype: 'json',
                    data:{pidioma_id:$("#pidioma_id").val()},
                        success: function(data) { cargarPidioma(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_pidioma').validate({
    rules: {
        idioma: {
            required: true
        },
        lectura: {
            required: true
        },
        escritura: {
            required: true
        },
        conversacion: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePidioma/',
            type:'POST',
            datatype: 'json',
            data:{pidioma_id:$("#pidioma_id").val(),idioma:$("#idioma").val(),lectura:$("#lectura").val(),escritura:$("#escritura").val(),conversacion:$("#conversacion").val()},
                success: function(data) { cargarPidioma(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pidioma').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN CURSOS Y SEMINARIOS**************************/


/***********AJAX DOCENCIA**************/

cargarPdocencia();   
function cargarPdocencia(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'gestion',type: 'string'},
        { name: 'institucion',type: 'string'},
        { name: 'materia',type: 'string'},
        { name: 'duracion',type: 'string'},
        ],
        url: '/ppostulantes/listPdocencia/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPdocencia").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Gestión', datafield: 'gestion', filtertype: 'input',width: '15%' },
                { text: 'Institución', datafield: 'institucion', filtertype: 'input',width: '35%' },
                { text: 'Asignatura', datafield: 'materia', filtertype: 'input',width: '35%' },
                { text: 'Carga Horaria', datafield: 'duracion', filtertype: 'input',width: '13%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_docencia").click(function(){
    $("#titulo_docencia").text("Adicionar Docencia");
    $("#pdocencia_id").val("");
    // $("#gestion_docencia").val("");
    $("#institucion_docencia").val("");
    $("#materia_docencia").val("");
    $("#duracion_docencia").val("");
    $('#myModal_Pdocencia').modal('show');
});

$("#edit_docencia").click(function() {
    $("#titulo_docencia").text("Editar Docencia");
    var rowindex = $("#jqxgridPdocencia").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPdocencia").jqxGrid('getrowdata', rowindex);
        $("#pdocencia_id").val(dataRecord.id);
        $("#gestion_docencia").val(dataRecord.gestion);
        $("#institucion_docencia").val(dataRecord.institucion);
        $("#materia_docencia").val(dataRecord.materia);
        $("#duracion_docencia").val(dataRecord.duracion);
        $('#myModal_Pdocencia').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_docencia").click(function() {
    var rowindex = $("#jqxgridPdocencia").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPdocencia").jqxGrid('getrowdata', rowindex);
        $("#pdocencia_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePdocencia/',
                    type:'POST',
                    datatype: 'json',
                    data:{pdocencia_id:$("#pdocencia_id").val()},
                        success: function(data) { cargarPdocencia(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_pdocencia').validate({
    rules: {
        gestion_docencia: {
            required: true
        },
        institucion_docencia: {
            required: true
        },
        materia_docencia: {
            required: true
        },
        duracion_docencia: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePdocencia/',
            type:'POST',
            datatype: 'json',
            data:{pdocencia_id:$("#pdocencia_id").val(),gestion:$("#gestion_docencia").val(),institucion:$("#institucion_docencia").val(),materia:$("#materia_docencia").val(),duracion:$("#duracion_docencia").val()},
                success: function(data) { cargarPdocencia(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Pdocencia').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN CURSOS Y SEMINARIOS**************************/


/***********AJAX REFERENCIAS**************/

cargarPreferencia();   
function cargarPreferencia(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'nombres_y_apps',type: 'string'},
        { name: 'institucion',type: 'string'},
        { name: 'cargo',type: 'string'},
        { name: 'telefono',type: 'string'},
        ],
        url: '/ppostulantes/listPreferencia/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPreferencia").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Nombre(s) y Apellido(s)', datafield: 'nombres_y_apps', filtertype: 'input',width: '30%' },
                { text: 'Institución', datafield: 'institucion', filtertype: 'input',width: '25%' },
                { text: 'Cargo', datafield: 'cargo', filtertype: 'input',width: '30%' },
                { text: 'Teléfono', datafield: 'telefono', filtertype: 'input',width: '13%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_referencia").click(function(){
    $("#titulo_referencia").text("Adicionar Referencia Laboral");
    $("#preferencia_id").val("");
    $("#nombres_y_apps_referencia").val("");
    $("#institucion_referencia").val("");
    $("#cargo_referencia").val("");
    $("#telefono_referencia").val("");
    $('#myModal_Preferencia').modal('show');
});

$("#edit_referencia").click(function() {
    $("#titulo_referencia").text("Editar Referencia Laboral");
    var rowindex = $("#jqxgridPreferencia").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPreferencia").jqxGrid('getrowdata', rowindex);
        $("#preferencia_id").val(dataRecord.id);
        $("#nombres_y_apps_referencia").val(dataRecord.nombres_y_apps);
        $("#institucion_referencia").val(dataRecord.institucion);
        $("#cargo_referencia").val(dataRecord.cargo);
        $("#telefono_referencia").val(dataRecord.telefono);
        $('#myModal_Preferencia').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_referencia").click(function() {
    var rowindex = $("#jqxgridPreferencia").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPreferencia").jqxGrid('getrowdata', rowindex);
        $("#preferencia_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePreferencia/',
                    type:'POST',
                    datatype: 'json',
                    data:{preferencia_id:$("#preferencia_id").val()},
                        success: function(data) { cargarPreferencia(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_preferencia').validate({
    rules: {
        nombres_y_apps_referencia: {
            required: true
        },
        institucion_referencia: {
            required: true
        },
        cargo_referencia: {
            required: true
        },
        telefono_referencia: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePreferencia/',
            type:'POST',
            datatype: 'json',
            data:{preferencia_id:$("#preferencia_id").val(),nombres_y_apps:$("#nombres_y_apps_referencia").val(),institucion:$("#institucion_referencia").val(),cargo:$("#cargo_referencia").val(),telefono:$("#telefono_referencia").val()},
                success: function(data) { cargarPreferencia(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Preferencia').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN REFERENCIAS**************************/

/***********AJAX REFERENCIAS PERSONAL**************/

cargarPreferenciapersonal();   
function cargarPreferenciapersonal(){
    var source =
    {
        datatype: "json",
        datafields: [
        { name: 'id',type: 'number'},
        { name: 'nombres_y_apps',type: 'string'},
        { name: 'parentesco',type: 'string'},
        { name: 'telefono',type: 'string'},
        ],
        url: '/ppostulantes/listPreferenciapersonal/',
        cache: false
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgridPreferenciapersonal").jqxGrid(
    {
        width: '100%',
        height: '300px',
        source: dataAdapter,
        sortable: true,
        altRows: true,
                theme: 'custom',
                columnsresize: true,
                pageable: true,
                // pagerMode: 'advanced',
                // showfilterrow: true,
                filterable: true,
                // showtoolbar: true,
                autorowheight: true,
                columns: [
                {
                    text: '#', sortable: false, filterable: false, editable: false,
                    groupable: false, draggable: false, resizable: false,
                    datafield: '', columntype: 'number', width: '2%',
                    cellsrenderer: function (row, column, value) {
                        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                    }
                },
                { text: 'Nombre(s) y Apellido(s)', datafield: 'nombres_y_apps', filtertype: 'input',width: '40%' },
                { text: 'Parentesco', datafield: 'parentesco', filtertype: 'input',width: '45%' },
                { text: 'Teléfono', datafield: 'telefono', filtertype: 'input',width: '13%' }
                ]
            });

}

// update the edited row when the user clicks the 'Save' button.
$("#add_referenciapersonal").click(function(){
    $("#titulo_referenciapersonal").text("Adicionar Referencia Personal");
    $("#preferenciapersonal_id").val("");
    $("#nombres_y_apps_referenciapersonal").val("");
    $("#parentesco_referenciapersonal").val("");
    $("#telefono_referenciapersonal").val("");
    $('#myModal_Preferenciapersonal').modal('show');
});

$("#edit_referenciapersonal").click(function() {
    $("#titulo_referenciapersonal").text("Editar Referencia Personal");
    var rowindex = $("#jqxgridPreferenciapersonal").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {
        var dataRecord = $("#jqxgridPreferenciapersonal").jqxGrid('getrowdata', rowindex);
        $("#preferenciapersonal_id").val(dataRecord.id);
        $("#nombres_y_apps_referenciapersonal").val(dataRecord.nombres_y_apps);
        $("#parentesco_referenciapersonal").val(dataRecord.parentesco);
        $("#telefono_referenciapersonal").val(dataRecord.telefono);
        $('#myModal_Preferenciapersonal').modal('show');     
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
    }
})

$("#delete_referenciapersonal").click(function() {
    var rowindex = $("#jqxgridPreferenciapersonal").jqxGrid("getselectedrowindex");
    if (rowindex > -1)
    {   
        var dataRecord = $("#jqxgridPreferenciapersonal").jqxGrid('getrowdata', rowindex);
        $("#preferenciapersonal_id").val(dataRecord.id);
        bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
            if (result==true) {
                var v=$.ajax({
                    url:'/ppostulantes/deletePreferenciapersonal/',
                    type:'POST',
                    datatype: 'json',
                    data:{preferenciapersonal_id:$("#preferenciapersonal_id").val()},
                        success: function(data) { cargarPreferenciapersonal(); //alert('Guardado Correctamente'); 
                                                }, //mostramos el error
                                                error: function() { alert('Se ha producido un error Inesperado'); }
                                            });
            }
        });        
    }
    else{
        bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
    }

})


$('#testForm_preferenciapersonal').validate({
    rules: {
        nombres_y_apps_referenciapersonal: {
            required: true
        },
        parentesco_referenciapersonal: {
            required: true
        },
        telefono_referenciapersonal: {
            required: true
        }
    },
    highlight: function (element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function (element) {
        //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
    },
    submitHandler: function (form) {
        var v=$.ajax({
            url:'/ppostulantes/savePreferenciapersonal/',
            type:'POST',
            datatype: 'json',
            data:{preferenciapersonal_id:$("#preferenciapersonal_id").val(),nombres_y_apps:$("#nombres_y_apps_referenciapersonal").val(),parentesco:$("#parentesco_referenciapersonal").val(),telefono:$("#telefono_referenciapersonal").val()},
                success: function(data) { cargarPreferenciapersonal(); //alert(data); 
                }, //mostramos el error
                error: function() { alert('Se ha producido un error Inesperado'); }
            });
        $('#myModal_Preferenciapersonal').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });
/***************FIN REFERENCIAS**************************/

});


$('#fecha_emision').datepicker();