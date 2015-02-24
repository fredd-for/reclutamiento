$(document).ready(function() {
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'id', type: 'number'},
                    {name: 'resolucion_id', type: 'string'},
                    {name: 'categoria', type: 'string'},
                    {name: 'clase', type: 'number'},
                    {name: 'nivel', type: 'number'},
                    {name: 'denominacion', type: 'string'},
                    {name: 'sueldo', type: 'number'},
                    {name: 'fecha_ini', type: 'date', format: 'dd-MM-yyyy'},
                    {name: 'fecha_ini_v', type: 'string'},
                    {name: 'fecha_fin', type: 'date'},
                    {name: 'activo'},
                    {name: 'activo1', type: 'string'},
                    {name: 'nivelsalarial_id_existente'}
                ],
                url: '/nivelsalariales/list',
                cache: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    cargar();
    function cargar() {
        $("#jqxgrid").jqxGrid(
                {
                    width: '100%',
                    source: dataAdapter,
                    sortable: true,
                    altRows: true,
                    theme: 'custom',
                    //groupable: true,
                    columnsresize: true,
                    pageable: true,
                    pagerMode: 'advanced',
                    showfilterrow: true,
                    filterable: true,
                    //showtoolbar: true,
                    autorowheight: true,
                    columns: [
                        {
                            text: '#', sortable: false, filterable: false, editable: false,
                            groupable: false, draggable: false, resizable: false,
                            datafield: '', columntype: 'number', width: '3%',
                            cellsrenderer: function(row, column, value) {
                                return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                            }
                        },
                        {text: 'Categoria', datafield: 'categoria', filtertype: 'input', width: '22%'},
                        {text: 'Clase', datafield: 'clase', filtertype: 'number', width: '5%'},
                        {text: 'Nivel', datafield: 'nivel', filtertype: 'number', width: '5%'},
                        {text: 'Denominacion', datafield: 'denominacion', filtertype: 'input', width: '30%'},
                        {text: 'Sueldo Bs.', datafield: 'sueldo', filtertype: 'number', width: '10%', cellsalign: 'center', align: 'center'},
                        {text: 'Fecha Inicio', datafield: 'fecha_ini', filtertype: 'range', width: '9%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align: 'center'},
                        {text: 'Fecha Final', datafield: 'fecha_fin', filtertype: 'range', width: '9%', cellsalign: 'center', cellsformat: 'dd-MM-yyyy', align: 'center'},
                        {text: 'Estado', datafield: 'activo1', filtertype: 'checkedlist', width: '7%'}
                    ]
                });

    }
    /*
     $("#jqxgrid").bind('rowselect', function(event) {
     var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', event.args.rowindex);
     //alert(dataRecord.estado);
     $("#id").val(dataRecord.id);
     $("#resolucion_id").val(dataRecord.resolucion_id);
     $("#categoria").val(dataRecord.categoria);
     $("#clase").val(dataRecord.clase);
     $("#nivel").val(dataRecord.nivel);
     $("#denominacion").val(dataRecord.denominacion);
     $("#sueldo").val(dataRecord.sueldo);
     $("#fecha_ini").val(dataRecord.fecha_ini_v);
     //$("#activo").removeAttr('checked');
     //$('#activo').attr('checked',false);
     if (dataRecord.activo == '1') {
     $("#activo").prop('checked', true);
     } else {
     $("#activo").prop('checked', false);
     }
     
     });*/
    $("#add").click(function() {
        $("#titulo").text("Adicionar");
        $("#id").val("");
        $("#resolucion_id").val("");
        $("#categoria").val("");
        $("#clase").val("");
        $("#nivel").val("");
        $("#denominacion").val("");
        $("#sueldo").val("");
        $("#nivelsalarial_id_existente").val("");
        $('#myModal').modal('show');
        $("input#fecha_ini").attr('value', '');
        $('#fecha_ini').datepicker();
    });

    $("#edit").click(function() {
        var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
        if (rowindex > -1)
        {
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
            $("#id").val(dataRecord.id);

            var fe = $.jqx.dataFormat.formatdate(dataRecord.fecha_ini_v, 'dd-MM-yyyy');
            $("input#fecha_ini").attr('value', fe);
            $("#titulo").text("Editar");


            $("#resolucion_id").val(dataRecord.resolucion_id);
            $("#categoria").val(dataRecord.categoria);
            $("#clase").val(dataRecord.clase);
            $("#nivel").val(dataRecord.nivel);
            $("#denominacion").val(dataRecord.denominacion);
            $("#sueldo").val(dataRecord.sueldo);

            //$("#activo").removeAttr('checked');
            //$('#activo').attr('checked',false);
            if (dataRecord.activo == '1') {
                $("#activo").prop('checked', true);
            } else {
                $("#activo").prop('checked', false);
            }

            getnivel(nivel);
            $('#myModal').modal('show');
            $('#fecha_ini').datepicker();
        }
        else
        {
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
        }

    });

    $("#delete").click(function() {
        if ($("#id").val() != "") {
            bootbox.confirm("<strong>¡Mensaje!</strong> Esta seguro de eliminar el registro.", function(result) {
                if (result == true) {
                    var v = $.ajax({
                        url: '/nivelsalariales/delete/',
                        type: 'POST',
                        datatype: 'json',
                        data: {id: $("#id").val()},
                        success: function(data) {
                            cargar(); //alert('Guardado Correctamente'); 
                        }, //mostramos el error
                        error: function() {
                            alert('Se ha producido un error Inesperado');
                        }
                    });
                }
            });
        } else {
            
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para eliminar.");
        }
    });

    $("#perfil").click(function() {
        if ($("#id").val() != "") {
            var v = $.ajax({
                url: '/nivelsalariales/getCargosPerfiles/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val()},
                success: function(data) {
                    var res = jQuery.parseJSON(data);
                    if (res.length > 0) {
                        $.each(res, function(key, valo) {
                            //alert(valo.formacion_academica);
                            $("#perfil_id").val(valo.id);
                            $("#formacion_academica").val(valo.formacion_academica);
                            $("#exp_general_lic").val(valo.exp_general_lic);
                            $("#exp_general_tec").val(valo.exp_general_tec);
                            $("#exp_profesional_lic").val(valo.exp_profesional_lic);
                            $("#exp_profesional_tec").val(valo.exp_profesional_tec);
                            $("#exp_relacionado_lic").val(valo.exp_relacionado_lic);
                            $("#exp_relacionado_tec").val(valo.exp_relacionado_tec);
                            $("#formacion_academica0").val(valo.formacion_academica0);
                            $("#exp_general_lic0").val(valo.exp_general_lic0);
                            $("#exp_general_tec0").val(valo.exp_general_tec0);
                            $("#exp_profesional_lic0").val(valo.exp_profesional_lic0);
                            $("#exp_profesional_tec0").val(valo.exp_profesional_tec0);
                            $("#exp_relacionado_lic0").val(valo.exp_relacionado_lic0);
                            $("#exp_relacionado_tec0").val(valo.exp_relacionado_tec0);
                        });
                    } else {
                        $("#perfil_id").val("");
                        $("#formacion_academica").val("");
                        $("#exp_general_lic").val("");
                        $("#exp_general_tec").val("");
                        $("#exp_profesional_lic").val("");
                        $("#exp_profesional_tec").val("");
                        $("#exp_relacionado_lic").val("");
                        $("#exp_relacionado_tec").val("");
                        $("#formacion_academica0").val("");
                        $("#exp_general_lic0").val("");
                        $("#exp_general_tec0").val("");
                        $("#exp_profesional_lic0").val("");
                        $("#exp_profesional_tec0").val("");
                        $("#exp_relacionado_lic0").val("");
                        $("#exp_relacionado_tec0").val("");
                    }

                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });

            $("#tituloPerfil").text("PERFIL GENERICO DE CARGOS / " + $("#denominacion").val() + " / " + $("#sueldo").val() + "Bs.");
            $('#myModal_Perfil').modal('show');
        } else {
            bootbox.alert("<strong>¡Mensaje!</strong> Seleccionar un registro para editar.");
        }
    });

    $("#Guardar").click(function() {

        var v = $.ajax({
            url: '/nivelsalariales/savePerfil/',
            type: 'POST',
            datatype: 'json',
            data: {perfil_id: $("#perfil_id").val(), nivelsalarial_id: $("#id").val(), formacion_academica: $("#formacion_academica").val(), exp_general_lic: $("#exp_general_lic").val(), exp_general_tec: $("#exp_general_tec").val(), exp_profesional_lic: $("#exp_profesional_lic").val(), exp_profesional_tec: $("#exp_profesional_tec").val(), exp_relacionado_lic: $("#exp_relacionado_lic").val(), exp_relacionado_tec: $("#exp_relacionado_tec").val(), formacion_academica0: $("#formacion_academica0").val(), exp_general_lic0: $("#exp_general_lic0").val(), exp_general_tec0: $("#exp_general_tec0").val(), exp_profesional_lic0: $("#exp_profesional_lic0").val(), exp_profesional_tec0: $("#exp_profesional_tec0").val(), exp_relacionado_lic0: $("#exp_relacionado_lic0").val(), exp_relacionado_tec0: $("#exp_relacionado_tec0").val()},
            success: function(data) {
                cargar(); //alert(data); 
            }, //mostramos el error
            error: function() {
                alert('Se ha producido un error Inesperado');
            }
        });
        // $("#popupWindow_perfil").jqxWindow('hide');
        $('#myModal_Perfil').modal('hide');

    });

    $('#testForm').validate({
        rules: {
            resolucion_id: {
                required: true
            },
            categoria: {
                required: true
            },
            denominacion: {
                required: true
            },
            clase: {
                required: true
            },
            nivel: {
                required: true
            },
            sueldo: {
                required: true
            }
        },
        highlight: function(element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function(element) {
            //element.text('OK!').addClass('valid').closest('.control-group').removeClass('error').addClass('success');
            element.addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        },
        submitHandler: function(form) {
            // form validates so do the ajax
            var v = $.ajax({
                url: '/nivelsalariales/save/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val(), resolucion_id: $("#resolucion_id").val(), categoria: $("#categoria").val(), clase: $("#clase").val(), nivel: $("#nivel").val(), denominacion: $("#denominacion").val(), sueldo: $("#sueldo").val(), fecha_ini: $("#fecha_ini").val(), activo: $("#activo").is(':checked'), nivelsalarial_id_existente: $("#nivelsalarial_id_existente").val()},
                success: function(data) {
                    cargar(); //alert(data); 
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
            $('#myModal').modal('hide');
            return false; // ajax used, block the normal submit
        }
    });

    $("#nivel").blur(function() {
        var nivel = $("#nivel").val();
        getnivel(nivel);

    })

    function getnivel(nivel) {
        if (nivel != '') {
            var v = $.ajax({
                url: '/nivelsalariales/getNivelActivo/',
                type: 'POST',
                datatype: 'json',
                data: {nivel: $("#nivel").val()},
                success: function(data) {
                    var res = jQuery.parseJSON(data);
                    if (res.length > 0) {
                        $.each(res, function(key, valo) {
                            // alert(valo.denominacion);
                            $("#nivelsalarial_id_existente").val(valo.id);
                            $("#categoria").val(valo.categoria);
                            $("#clase").val(valo.clase);
                            $("#denominacion").val(valo.denominacion);
                            $("#sueldo").val(valo.sueldo);
                            $("#nivel_existente").html("Denominación:" + valo.denominacion + "<br>Sueldo:" + valo.sueldo + " Bs.<br>Fecha Inicio:" + valo.fecha_ini + "<br>ACTIVO");
                        });
                    } else {
                        $("#nivelsalarial_id_existente").val('');
                        $("#categoria").val('');
                        $("#clase").val('');
                        $("#denominacion").val('');
                        $("#sueldo").val('');
                        $("#nivel_existente").html("");
                    }
                }, //mostramos el error
                error: function() {
                    alert('Se ha producido un error Inesperado');
                }
            });
        }
    }

    $("#activo").click(function() {
        //alert($("#activo").is(':checked'));
        if ($("#activo").is(':checked') && $("#nivelsalarial_id_existente").val() != '') {
            bootbox.alert("<strong>¡Mensaje!</strong> Esta seguro de activar el nivel salarial creado. Los demas niveles se desactivaran automaticamente.");
        }
    });

});