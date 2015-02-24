$(document).ready(function () {
    
    var source =
            {
                datatype: "json",
                datafields: [
                    {name: 'id'},
                    {name: 'p_nombre'},
                    {name: 's_nombre'},
                    {name: 'p_apellido'},
                    {name: 's_apellido'},
                    {name: 'ci', type: 'string'},
                    {name: 'fecha_nac', format: 'date'},
                    {name: 'expd'},
                    {name: 'foto'},
                    {name: 'suma'},
                    {name: 'e_civil'},
                    {name: 'genero'},
                    {name: 'nacionalidad'},
                    {name: 'fecha_apr', format: 'date'}
                ],
                url: '/personas/listajson',
                cache: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    
    var toThemeProperty = function(className) {
            return className + " " + className + "-" + theme;
        }
        var groupsrenderer = function(text, group, expanded, data) {
// if (data.groupcolumn.datafield == 'uh_costo' || data.groupcolumn.datafield == 'uh_aprobado') {
            if (data.subItems.length > 0) {
                var aggregate = this.getcolumnaggregateddata('id', ['sum'], true, data.subItems);
                var total = this.getcolumnaggregateddata('suma', ['sum'], true, data.subItems);
                //var suma = this.getcolumnaggregateddata('suma', ['sum'], true, data.subItems);
            }
            else {
                var rows = new Array();
                var getRows = function(group, rows) {
                    if (group.subGroups.length > 0) {
                        for (var i = 0; i < group.subGroups.length; i++) {
                            getRows(group.subGroups[i], rows);
                        }
                    }
                    else {
                        for (var i = 0; i < group.subItems.length; i++) {
                            rows.push(group.subItems[i]);
                        }
                    }
                }
                getRows(data, rows);
                var aggregate = this.getcolumnaggregateddata('id', ['sum'], true, rows);
                //var total = this.getcolumnaggregateddata('cantidad_vendida', ['sum'], true, rows);
                var total = this.getcolumnaggregateddata('suma', ['sum'], true, rows);
            }
            return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute "><span style="margin: 5px 0 0 0;">' + text + ' (' + total.sum + ') , </span>' + '<span class="' + toThemeProperty('jqx-grid-groups-row-details') + '">' + "Cantidad Valores:<b>" + 1 + "</b>, Monto Bs: " + '<b>' + 1 + '</b>' + '</span></div>';
            // }
            //  else {
            //     return '<div class="' + toThemeProperty('jqx-grid-groups-row') + '" style="position: absolute;"><span>' + text + '</span>';
            //  }
        }
        var barra = function(statusbar) {
        };
    
    
    $("#jqxgrid").jqxGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                altRows: true,
                showstatusbar: true,
                statusbarheight: 25,
                //altrows: true,
             // showaggregates: true,
                // pageable: true,
                pagerMode: 'advanced',
                theme: 'custom',
                showfilterrow: true,
                filterable: true,
                scrollmode: 'deferred',
                 renderstatusbar: barra,
                scrollfeedback: function (row)
                {
                    return '<table style="height: 150px;"><tr><td><img src="' + row.foto + '"  height="90"/></td></tr><tr><td>' + row.p_nombre + '</td></tr></table>';
                },
                rowsheight: 90,
                //groupeable: true,
                columns: [
                    {text: 'Image', datafield: 'foto', width: 100, cellsrenderer: function (row, column, value) {
                            return '<img src="' + value + '" height="90"/>';
                        }
                    },
                    {text: 'Nro', datafield: 'id', width: '5%', hidden: true,
                    },
                    {text: 'Nombres', datafield: 'p_nombre', width: '14%',                        
                    },
                    //{text: '2o Nombre', datafield: 's_nombre', width: '14%'},
                    {text: 'Apellidos', datafield: 'p_apellido', width: '20%'},
                    {text: 'A. Casada', datafield: 's_apellido', width: '14%'},
                    {text: 'Doc. Ident.', datafield: 'ci', type: 'string', width: '10%'},
                    {text: 'EXP', datafield: 'expd', type: 'string', filtertype: 'input', width: '5%'},
                    {text: 'Fecha Nac.', datafield: 'fecha_nac', format: 'date', filtertype: 'range', cellsformat: 'yyyy', width: '8%'},
                    {text: 'Estado Civil.', datafield: 'e_civil',  width: '8%'},
                    {text: 'Genero', datafield: 'genero',  width: '5%'},
                    {text: 'Nacionalidad', datafield: 'nacionalidad',  width: '8%'},
                    
                ]
            });



  $("#jqxgrid").bind("filter", function(event) {
        var visibleRows = $('#jqxgrid').jqxGrid('getrows');
        var count = visibleRows.length;        
        $('#statusbarjqxgrid').html('Total: <b>' + count + '</b>');
    });
    $("#jqxgrid").bind("bindingcomplete", function(event) {
        var visibleRows = $('#jqxgrid').jqxGrid('getrows');
        var count = visibleRows.length;
        var total_venta = 0;
        var total = 0;
        $.each(visibleRows, function(i, e) {
            total += e.suma;
            
        });
        $('#statusbarjqxgrid').html('Total: <b>' + count + '</b>');
        $('#fecha').addClass('animated');
        $('#fecha').addClass('fadeIn');
    });






    // initialize the popup window and buttons.

    // update the edited row when the user clicks the 'Save' button.
    $("#imprimir").click(function () {
        columna = new Object();
        filtros = new Object();
        row_id = $('#jqxgrid').jqxGrid('getcolumn', 'id');
        p_nombre = $('#jqxgrid').jqxGrid('getcolumn', 'p_nombre');
        s_nombre = $('#jqxgrid').jqxGrid('getcolumn', 's_nombre');
        p_apellido = $('#jqxgrid').jqxGrid('getcolumn', 'p_apellido');
        s_apellido = $('#jqxgrid').jqxGrid('getcolumn', 's_apellido');
        ci = $('#jqxgrid').jqxGrid('getcolumn', 'ci');
        fecha_nac = $('#jqxgrid').jqxGrid('getcolumn', 'fecha_nac');
        expd = $('#jqxgrid').jqxGrid('getcolumn', 'expd');
        columna[p_nombre.datafield] = {text: p_nombre.text, hidden: p_nombre.hidden};
        columna[row_id.datafield] = {text: row_id.text, hidden: row_id.hidden};
        columna[s_nombre.datafield] = {text: s_nombre.text, hidden: s_nombre.hidden};
        columna[p_apellido.datafield] = {text: p_apellido.text, hidden: p_apellido.hidden};
        columna[s_apellido.datafield] = {text: s_apellido.text, hidden: s_apellido.hidden};
        columna[ci.datafield] = {text: ci.text, hidden: ci.hidden};
        columna[expd.datafield] = {text: expd.text, hidden: expd.hidden};
        columna[fecha_nac.datafield] = {text: fecha_nac.text, hidden: fecha_nac.hidden};
        var rows = $('#jqxgrid').jqxGrid('getrows');//alert(rows[0]['p_nombre']);
        var filterGroups = $('#jqxgrid').jqxGrid('getfilterinformation');
        var counter = 0;
        for (var i = 0; i < filterGroups.length; i++) {
            var filterGroup = filterGroups[i];
            var filters = filterGroup.filter.getfilters();
            for (var j = 0; j < filters.length; j++) {
                if (j > 0) {
                    counter++;
                }
                var indice = i + counter;
                filtros[indice] = {columna: filterGroup.filtercolumn, valor: filters[j].value,
                    condicion: filters[j].condition, tipo: filters[j].type};
            }
        }
        var n_rows = rows.length;
        var json_filter = JSON.stringify(filtros);
        //var json_rows = JSON.stringify(rows);
        var json_columns = JSON.stringify(columna);
        //json_rows = btoa(utf8_encode(json_rows));
        json_columns = btoa(utf8_encode(json_columns));
        json_filter = btoa(utf8_encode(json_filter));
        //json_rows = json_rows.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        json_columns = json_columns.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        json_filter = json_filter.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
        window.open("/personal/imprimir/" + n_rows + "/" + json_columns + "/" + json_filter, "_blank");
    });
    $("#add").click(function () {
        //$("#page-content").load('../../personal/registro');
        document.location.href = '../../personal/registro';
        /*$("#titulo").text("Adicionar");
         $("#id").val("");
         $("#tipo_resolucion").val("");
         $("#numero_res").val("");
         $("#popupWindow").jqxWindow('open');
         $("#fecha_emi").jqxDateTimeInput({width: '250px', height: '25px',formatString:'yyyy-MM-dd'});
         fecha= new Date();
         fecha.setDate(fecha.getDate());
         $("#fecha_emi").jqxDateTimeInput('setDate', fecha);
         fecha= new Date();
         fecha.setDate(fecha.getDate());
         $("#fecha_apr").jqxDateTimeInput('setDate', fecha);*/
    });

    $("#Save").click(function () {
        var fecha_apr = $('#fecha_apr').jqxDateTimeInput('getDate');
        var fecha_emi = $('#fecha_emi').jqxDateTimeInput('getDate');
        var v = $.ajax({
            url: '../../resoluciones/save/',
            type: 'POST',
            datatype: 'json',
            data: {id: $("#id").val(), tipo_resolucion: $("#tipo_resolucion").val(), numero_res: $("#numero_res").val(), fecha_apr: fecha_apr, fecha_emi: fecha_emi},
            success: function (data) {
                cargar(); //alert(data); 
            }, //mostramos el error
            error: function () {
                alert('Se ha producido un error Inesperado');
            }
        });
        $("#popupWindow").jqxWindow('hide');
        // }
    });

    $("#Eliminar").click(function () {
        if (editrow >= 0) {
            var v = $.ajax({
                url: '../../personal/delete/',
                type: 'POST',
                datatype: 'json',
                data: {id: $("#id").val()},
                success: function (data) {
                    cargar(); //alert('Guardado Correctamente'); 
                }, //mostramos el error
                error: function () {
                    alert('Se ha producido un error Inesperado');
                }
            });
            //$('#jqxgrid').jqxGrid();
            $("#popupWindow_delete").jqxWindow('hide');
        }
    });

});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


