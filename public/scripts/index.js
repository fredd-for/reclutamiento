
//ogranigrama nuevo
jQuery(window).load(function () {


    $.getJSON("/index/organigrama/", null, function (data) {


        var options = new primitives.orgdiagram.Config();

        options.items = eval(data);
        options.cursorItem = 15;
        options.templates = [getContactTemplate()];
        options.onItemRender = onTemplateRender;

        jQuery("#basicdiagram").orgDiagram(options);
        function onTemplateRender(event, data) {
            var hrefElement = data.element.find("[name=readmore]");
            var emailElement = data.element.find("[name=email]");
            switch (data.renderingMode) {
                case primitives.common.RenderingMode.Create:
                    /* Initialize widgets here */
                    hrefElement.click(function (e) {
                        //alert(data.context.id);
                        $("h3.modal-title").html(data.context.description);
                        //personigrama(data.context.id);
                        var id = $(this).attr('href');
                        var titulo = $(this).attr('titulo');
                        personigrama(id);
                        return false;
                    });
                    emailElement.click(function (e) {
                        /* Block mouse click propogation in order to avoid layout updates before server postback*/
                        primitives.common.stopPropagation(e);
                    });
                    break;
                case primitives.common.RenderingMode.Update:
                    /* Update widgets here */
                    break;
            }

            var itemConfig = data.context;

            if (data.templateName == "contactTemplate") {
                data.element.find("[name=titleBackground]").css({"background": itemConfig.itemTitleColor});
                data.element.find("[name=photo]").attr({"src": itemConfig.image});
                hrefElement.attr({"href": itemConfig.href});
                emailElement.attr({"href": ("mailto:" + itemConfig.email + "?Subject=Hello%20again")});


                var fields = ["title", "description", "phone", "email"];
                for (var index = 0; index < fields.length; index++) {
                    var field = fields[index];

                    var element = data.element.find("[name=" + field + "]");
                    if (element.text() != itemConfig[field]) {
                        element.text(itemConfig[field]);
                    }
                }
            }
        }

        function getContactTemplate() {
            var result = new primitives.orgdiagram.TemplateConfig();
            result.name = "contactTemplate";

            result.itemSize = new primitives.common.Size(130, 100);
            result.minimizedItemSize = new primitives.common.Size(3, 3);
            result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


            var itemTemplate = jQuery(
                    '<div class="bp-item bp-corner-all bt-item-frame">'
                    + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 126px; height: 20px;">'
                    + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; text-align:center; width: 118px; height: 18px;">'
                    + '</div>'
                    + '</div>'
                    //+ '<div name="phone" class="bp-item" style="top: 26px; left: 4px; width: 118px; height: 18px; font-size: 12px;"></div>'
                    //+ '<div class="bp-item" style="top: 44px; left: 4px; width: 118px; height: 18px; font-size: 12px;"><a name="email" href="" target="_top"></a></div>'
                    + '<div name="description" class="bp-item" style="top: 26px; left: 4px; width: 118px; height: 50px;text-align:center; font-size: 12px;"></div>'
                    + '<a name="readmore" title="Ver personigrama" class="bp-item" style="top: 76px; left: 4px; width: 118px; height: 12px; font-size: 10px; font-family: Arial; text-align: right; font-weight: bold; text-decoration: none;"><i class="fa fa-sitemap"></i></a>'
                    + '</div>'
                    ).css({
                width: result.itemSize.width + "px",
                height: result.itemSize.height + "px"
            }).addClass("bp-item bp-corner-all bt-item-frame");

            result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

            return result;
        }
    });//]]>  


});

function personigrama(id) {
    var url = "/iframe/personigrama/" + id;
    
    $('#iframe1').attr("src", url);
    

    
    $('#modal-large').modal('show');

    
    
    
   return false;
}


