$(document).ready(() => {
    /* -------------------------------------------------------------- */
    /* JS - Alerte lorsqu'on quitte la page */
    /* -------------------------------------------------------------- */
    $(window).on("beforeunload", () => {
        return "Ce truc est bizarre.";
    });
    /* -------------------------------------------------------------- */
    /* JS - Sauvegarde auto par minutes */
    /* -------------------------------------------------------------- */
    setInterval(() => {
        let text = $("#textEditor").html();
        localStorage.setItem("text", text);
    }, 60000);
    /* -------------------------------------------------------------- */
    /* JS - Chargement du texte */
    /* -------------------------------------------------------------- */
    $(window).on("load", () => {
        if(localStorage.getItem("text") != null) {
            let content = localStorage.getItem("text");
            $("#textEditor").html(content);
        };
    });
    /* -------------------------------------------------------------- */
    /* JS - Compteur de clique */
    /* -------------------------------------------------------------- */
    var count = 0;
    /* -------------------------------------------------------------- */
    /* JS - Creation du plugin */
    /* -------------------------------------------------------------- */
    $.fn.my_wysiwyg = (moreOptions) => {
        var options = mergeObjects(moreOptions);
        if(typeof options == "object") {
            $("textarea").remove();
            $("body").prepend("<div id='wysiwyg' data-theme='light'></div>");
            $("#wysiwyg").append("<div id='buttons'></div>");
            $("#buttons").append("<div id='topMenu'></div>");
            $("#buttons").append("<div id='bottomMenu'></div>");
            $("#wysiwyg").append("<div id='textEditor'></div>");
            $("#textEditor").attr("contenteditable", "true");
            $.each(options, (array, option) => {
                if(array == "buttons") {
                    $.each(option, (index, value) => {
                        if(value == "fontSize") {
                            $("#topMenu").append("<select id='" + value + "'><option selected default disabled>Size</option></select>");
                            for(let i = 1; i <= 7; i++) {
                                $("#" + value).append("<option value='" + i + "'>" + i + "</option>");
                            };
                        } else if(value == "fontName") {
                            $("#buttons > #topMenu > #fontSize").before("<select id='" + value + "'><option selected default disabled>Font</option></select>");
                            $("#" + value).append("<option value='Times New Roman'>Times New Roman</option>");
                            $("#" + value).append("<option value='Helvetica'>Helvetica</option>");
                            $("#" + value).append("<option value='Courier New'>Courier New</option>");
                            $("#" + value).append("<option value='DejaVu Sans Mono'>DejaVu Sans Mono</option>");
                        } else if(value == "foreColor") {
                            $("#bottomMenu").append("<button id='" + value + "'><img src='assets/images/" + value + ".png'><input type='color'></button>");
                        } else if(value == "addLine") {
                            $("#topMenu").append("<button id='" + value + "'><img src='assets/images/" + value + ".png'></button>");
                        } else if(value == "increaseLine") {
                            $("#topMenu > #addLine").after("<button id='" + value + "'><img src='assets/images/" + value + ".png'></button>");
                        } else if(value == "decreaseLine") {
                            $("#topMenu > #increaseLine").after("<button id='" + value + "'><img src='assets/images/" + value + ".png'></button>");
                        } else if(value == "underline") {
                            $("#bottomMenu > #italic").after("<button id='" + value + "'><img src='assets/images/" + value + ".png'></button>");
                        } else {
                            $("#bottomMenu").append("<button id='" + value + "'><img src='assets/images/" + value + ".png'></button>");
                        };
                    });
                } else if(array == "theme") {
                    $("#wysiwyg").attr("data-theme", options.theme[0]);
                };
            });
        } else {
            return false;
        };
        /* -------------------------------------------------------------- */
        /* JS - Écoute de l'évènement click sur les boutons supérieurs */
        /* -------------------------------------------------------------- */
        $.each($("#buttons > #topMenu > button"), (index, element) => {
            $(element).click(() => {
                let button = $(element).attr("id");
                let currentHeight = $("#textEditor > hr").css("height");
                if(currentHeight) {
                    var heightValue = eval(currentHeight.substring(0, currentHeight.indexOf("p")));
                };
                switch (button) {
                    case "addLine":
                        $("#textEditor").append("<hr>");
                        $("#textEditor > hr")
                        .css("height", "1px")
                        .css("margin", "10px 0px")
                        .css("background-color", "#2B2B2B");
                        break;
                    case "increaseLine":
                        let increase = heightValue + 1;
                        $("#textEditor > hr").css("height", increase + "px");
                        break;
                    case "decreaseLine":
                        let decrease = heightValue - 1;
                        $("#textEditor > hr").css("height", decrease + "px");
                        break;
                    default:
                        break;
                };
                let text = $("#textEditor").html();
                localStorage.setItem("text", text);
            });
        });
        /* -------------------------------------------------------------- */
        /* JS - Écoute de l'évènement click sur les boutons inférieurs */
        /* -------------------------------------------------------------- */
        $.each($("#buttons > #bottomMenu > button"), (index, element) => {
            $(element).click(() => {
                let button = $(element).attr("id");
                switch (button) {
                    case "bold":
                        document.execCommand(button, true);
                        break;
                    case "italic":
                        document.execCommand(button, true);
                        break;
                    case "underline":
                        document.execCommand(button, true);
                        break;
                    case "strikeThrough":
                        document.execCommand(button, true);
                        break;
                    case "createLink":
                        let url = prompt("Veuillez indiquer l'url.");
                        document.execCommand(button, true, url);
                        break;
                    case "insertImage":
                        let src = prompt("Veuillez indiquer l'url.");
                        document.execCommand(button, true, src);
                        break;
                    case "insertVideo":
                        let vid = prompt("Veuillez indiquer le code d'integration.");
                        $("#textEditor").append(vid);
                        break;
                    case "indent":
                        document.execCommand(button, true);
                        break;
                    case "outdent":
                        document.execCommand(button, true);
                        break;
                    case "justifyLeft":
                        document.execCommand(button, true);
                        break;
                    case "justifyRight":
                        document.execCommand(button, true);
                        break;
                    case "justifyCenter":
                        document.execCommand(button, true);
                        break;
                    case "justifyFull":
                        document.execCommand(button, true);
                        break;
                    case "code":
                        count++;
                        if(count % 2 == 0) {
                            let text = $("#textEditor").text();
                            $("#textEditor").html(text);
                        } else {
                            let text = $("#textEditor").html();
                            $("#textEditor").text(text);
                        };
                        break;
                    default:
                        break;
                };
                let text = $("#textEditor").html();
                localStorage.setItem("text", text);
            });
        });
         /* -------------------------------------------------------------- */
        /* JS - Écoute de l'évènement change sur le select fontName */
        /* -------------------------------------------------------------- */
        $("#fontName").on("change", () => {
            document.execCommand("fontName", true, $("#fontName").val());
            let text = $("#textEditor").html();
            localStorage.setItem("text", text);
        });
        /* -------------------------------------------------------------- */
        /* JS - Écoute de l'évènement change sur le select fontSize */
        /* -------------------------------------------------------------- */
        $("#fontSize").on("change", () => {
            document.execCommand("fontSize", true, $("#fontSize").val());
            let text = $("#textEditor").html();
            localStorage.setItem("text", text);
        });
        /* -------------------------------------------------------------- */
        /* JS - Écoute de l'évènement change sur l'input type color */
        /* -------------------------------------------------------------- */
        $("#foreColor > input").on("change", () => {
            document.execCommand("foreColor", true, $("#foreColor > input").val());
            let text = $("#textEditor").html();
            localStorage.setItem("text", text);
        });
    };
    /* -------------------------------------------------------------- */
    /* JS - Fusionner les objets passés en paramètre */
    /* -------------------------------------------------------------- */
    function mergeObjects(moreOptions) {
        var mergedObjects = {
            buttons: [],
            theme: [
                "light"
            ]
        };
        var options = {
            buttons: [
                "fontSize",
                "bold",
                "italic",
                "strikeThrough",
                "foreColor",
                "createLink",
                "insertImage",
                "insertVideo",
                "indent",
                "outdent",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "code",
                "addLine",
                "increaseLine",
                "decreaseLine"
            ],
        };
        var cut = 0;
        $.each(options, (key1, array1) => {
            $.each(array1, (key2, value2) => {
                mergedObjects.buttons.push(value2);
                $.each(moreOptions, (key3, array3) => {
                    if(key3 == "theme") {
                        $.each(array3, (key4, value4) => {
                            cut++;
                            if(cut == 1 && value4 == "dark" && mergedObjects.theme[0] == "light") {
                                return mergedObjects.theme[0] = value4;
                            };
                        });
                    } else {
                        if(key1 == key3) {
                            $.each(array3, (key4, value4) => {
                                if(value2 == value4) {
                                    return false;
                                } else {
                                    if(options.buttons[options.buttons.length - 1] == value2) {
                                        mergedObjects.buttons.push(value4);
                                    };
                                };
                            });
                        };
                    };
                });
            });
        });
        return mergedObjects;
    };
    /* -------------------------------------------------------------- */
    /* JS - Transformation d'un textarea en éditeur de texte */
    /* -------------------------------------------------------------- */
    $("textarea").my_wysiwyg(
        {
            buttons: [
                "fontName",
                "underline"
            ],
            // theme: [
            //     "dark"
            // ]
        }
    );
});