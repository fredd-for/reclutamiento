jQuery(window).load(function () {
    var id = $('input#id').val();
    $.getJSON("/index/personigrama/" + id, null, function (data) {
        var nuevo = $("#basicdiagram2").orgDiagram({
            items: eval(data),
            templates: [getPersonTemplate()],
            cursorItem: 0,
            hasSelectorCheckbox: primitives.common.Enabled.False,
            onItemRender: onTemplate2Render,
        });



    });

    function onTemplate2Render(event, data) {
        var hrefElement = data.element.find("[name=readmore]");
        var emailElement = data.element.find("[name=email]");
        switch (data.renderingMode) {
            case primitives.common.RenderingMode.Create:
                /* Initialize widgets here */
                hrefElement.click(function (e) {
                    //alert(data.context.id);
                    personigrama(data.context.id);
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

        if (data.templateName == "PersonTemplate") {
            data.element.find("[name=titleBackground]").css({"background": itemConfig.itemTitleColor});
            data.element.find("[name=photo]").attr({"src": itemConfig.image});
            hrefElement.attr({"href": itemConfig.href});
            emailElement.attr({"href": ("mailto:" + itemConfig.email + "?Subject=Hello%20again")});


            var fields = ["title", "description", "phone", "email", "ci"];
            for (var index = 0; index < fields.length; index++) {
                var field = fields[index];

                var element = data.element.find("[name=" + field + "]");
                if (element.text() != itemConfig[field]) {
                    element.text(itemConfig[field]);
                }
            }
        }
    }
    function getPersonTemplate() {
        var result = new primitives.orgdiagram.TemplateConfig();
        result.name = "PersonTemplate";

        result.itemSize = new primitives.common.Size(180, 125);
        result.minimizedItemSize = new primitives.common.Size(3, 3);
        result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


        var itemTemplate = jQuery(
                '<div class="bp-item bp-corner-all bt-item-frame">'
                + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 176px; height: 20px;">'
                + '<div name="ci" class="bp-item bp-title" style="top: 3px; left: 6px; width: 168px; height: 18px; font-size:11px;">'
                + '</div>'
                + '</div>'
                + '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
                + '<img name="photo" style="height:55px; width:50px;" />'
                + '</div>'
                //+ '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 132px; height: 18px; font-size: 12px;"></div>'
                //+ '<div class="bp-item" style="top: 44px; left: 56px; width: 162px; height: 18px; font-size: 12px;"><a name="email" href="" target="_top"></a></div>'
                + '<div name="title" class="bp-item" style="top: 44px; left: 56px; width: 132px; height: 46px; font-size: 10px;"></div>'
                + '<a name="description" class="bp-item" style="top:  86px;color:#1B345C; left: 0px; width: 178px; height: 40px; font-size: 10px; font-family: Arial; text-align: center; text-decoration: none;"></a>'
                + '</div>'
                ).css({
            width: result.itemSize.width + "px",
            height: result.itemSize.height + "px"
        }).addClass("bp-item bp-corner-all bt-item-frame");

        result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

        return result;
    }

});