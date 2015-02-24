$(document).ready(function() {
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'id', type: 'number'},
                    {name: 'tipo_resolucion', type: 'string'},
                    {name: 'numero_res', type: 'number'},
                    {name: 'fecha_emi', type: 'date', format: 'dd-MM-yyyy'},
                    {name: 'fecha_apr', type: 'date'}
                ],
                url: '/resoluciones/list',
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
                    pageable: true,
                    pagerMode: 'advanced',
                    showfilterrow: true,
                    filterable: true,
                    columns: [
                        {
                            text: '#', sortable: false, filterable: false, editable: false,
                            groupable: false, draggable: false, resizable: false,
                            datafield: '', columntype: 'number', width: '5%',
                            cellsrenderer: function(row, column, value) {
                                return "<div style='margin:4px;'>" + (value + 1) + "</div>";
                            }
                        },
                        {text: 'Tipo Resolucion', datafield: 'tipo_resolucion', filtertype: 'input', width: '50%'},
                        {text: 'Nro Resolucion', datafield: 'numero_res', filtertype: 'input', width: '15%'},
                        {text: 'Fecha Emision', datafield: 'fecha_emi', filtertype: 'range', width: '15%', cellsalign: 'right', cellsformat: 'dd-MM-yyyy', align: 'center'},
                        {text: 'Fecha Aprobación', datafield: 'fecha_apr', filtertype: 'range', width: '15%', cellsalign: 'right', cellsformat: 'dd-MM-yyyy', align: 'center'}
                    ]
                });

    }
    // update the edited row when the user clicks the 'Save' button.
    $("#jqxgrid").bind('rowselect', function(event) {
        var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', event.args.rowindex);
        $("#id").val(dataRecord.id);
        $("#tipo_resolucion").val(dataRecord.tipo_resolucion);
        $("#numero_res").val(dataRecord.numero_res);
        var fe = $.jqx.dataFormat.formatdate(dataRecord.fecha_emi, 'dd-MM-yyyy');
        var fa = $.jqx.dataFormat.formatdate(dataRecord.fecha_apr, 'dd-MM-yyyy');
        $("#fecha_emi").val(fe);
        $("#fecha_apr").val(fa);
    });

    $("#add").click(function() {
        $("#titulo").text("Adicionar");
        $("#id").val("");
        $("#tipo_resolucion").val("");
        $("#numero_res").val("");
        $("#fecha_emi").val("");
        $("#fecha_apr").val("");
        $('#myModal').modal('show');
        $('#fecha_apr,#fecha_emi').datepicker();
    });

    $("#edit").click(function() {
         var rowindex = $('#jqxgrid').jqxGrid('getselectedrowindex');
        if (rowindex > -1)
        {
            var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', rowindex);
            $("#id").val(dataRecord.id);
            $("#tipo_resolucion").val(dataRecord.tipo_resolucion);
            $("#numero_res").val(dataRecord.numero_res);
            var fe = $.jqx.dataFormat.formatdate(dataRecord.fecha_emi, 'dd-MM-yyyy');
            var fa = $.jqx.dataFormat.formatdate(dataRecord.fecha_apr, 'dd-MM-yyyy');            
            $("input#fecha_emi").attr('value',fe);
            $("input#fecha_apr").attr('value',fa);
            $("#titulo").text("Editar");
            $('#myModal').modal('show');
            $('#fecha_apr,#fecha_emi').datepicker();
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
                        url: '/resoluciones/delete/',
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

    $('#testForm').validate({
        rules: {
            fecha_apr: {
                required: true
            },
            fecha_emi: {
                required: true
            },
            tipo_resolucion: {
                required: true
            },
            numero_res: {
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
            var fecha_apr = $('#fecha_apr').val();
            var fecha_emi = $('#fecha_emi').val();
            var v = $.ajax({
                url: '/resoluciones/save/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val(), tipo_resolucion: $("#tipo_resolucion").val(), numero_res: $("#numero_res").val(), fecha_apr: fecha_apr, fecha_emi: fecha_emi},
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
    
});