$(function () {
    var template = kendo.template($("#BookTemplate").html());
    var bookslibrary = [
        {
            "BookID": 0,
            "BookName": "Harry Potter",
            "BookAuthor": "J.K. Rowling",
            "Year": 1998,
            "BookPrice": 18,
            "Category": "Fantasy"          
        },
        {
            "BookID": 1,
            "BookName": "The Lord of the Rings",
            "BookAuthor": "J.R.R Tolkien",
            "Year": 2018,
            "BookPrice": 40,
            "Category": "Fantasy"
        },
        {
            "BookID": 2,
            "BookName": "The Hobbit - Special Edition",
            "BookAuthor": "J.R.R Tolkien",
            "Year": 2017,
            "BookPrice": 4,
            "Category": "Fantasy"
        },
        {
            "BookID": 3,
            "BookName": "Българска Кухня",
            "BookAuthor": "Илиян Димитров",
            "Year": 2000,
            "BookPrice": 20,
            "Category": "Cooking"
        },
        {
            "BookID": 4,
            "BookName": "Bread Baking",
            "BookAuthor": "Bonnie Ohara",
            "Year": 2018,
            "BookPrice": 13,
            "Category": "Cooking"
        },
        {
            "BookID": 5,
            "BookName": "The Flavor Bible",
            "BookAuthor": "Karen Page",
            "Year": 2008,
            "BookPrice": 23,
            "Category": "Cooking"
        },
        {
            "BookID": 6,
            "BookName": "Code Complete",
            "BookAuthor": "Steve McConnell",
            "Year": 2004,
            "BookPrice": 40,
            "Category": "Computers & Tech"
        },
        {
            "BookID": 7,
            "BookName": "Clean Code",
            "BookAuthor": "Robert C. Martin",
            "Year": 2008,
            "BookPrice": 33,
            "Category": "Computers & Tech"
        },
        {
            "BookID": 8,
            "BookName": "Javascript Guide",
            "BookAuthor": "David Flanagan",
            "Year": 2011,
            "BookPrice": 30,
            "Category": "Computers & Tech"
        },
        {
            "BookID": 9,
            "BookName": "Aquaman - 44",
            "BookAuthor": "DC Publishing",
            "Year": 2016,
            "BookPrice": 5,
            "Category": "Comic"
        },
        {
            "BookID": 10,
            "BookName": "Avengers - 13",
            "BookAuthor": "Marvel Publishing",
            "Year": 2016,
            "BookPrice": 4,
            "Category": "Comic"
        },
        {
            "BookID": 11,
            "BookName": "DuckTales - 17",
            "BookAuthor": "IDW Publishing",
            "Year": 2019,
            "BookPrice": 4,
            "Category": "Comic"
        }
    ];
    var dataSource = new kendo.data.DataSource({
        data: bookslibrary,
        requestStart: function () {
            kendo.ui.progress($("#products"), true);
        },
        requestEnd: function () {
            kendo.ui.progress($("#products"), false);
        },
        change: function () {
            $("#products").html(kendo.render(template, this.view()));
            var view = this.view();
            var all = $("#menu-all");
            var comic = $("#menu-comic");
            var fantasy = $("#menu-fantasy");
            var compTech = $("#menu-tech");
            var cooking = $("#menu-cooking");
            var counter = 0;
            var cart = [];
            var popDiv = $('#Popdiv');
            var cartIcon = $('.cart-icon');
            var totalSum = 0;
            var storage = localStorage;
            $(".add-to-cart").click(function (e) {
                $("#popdivInner").text('');
                $("#popdivInner").hide();
                var number;
                var btnClicked = e.target.id;
                cart.push(btnClicked);
                var counter = 1;
                var ids = [];
                for (let i = 0; i < cart.length; i++) {
                    number = cart[i].substring(5,); 
                    ids.push(number);  
                                    
                                                                  
                }
                storage.setItem(number, `${counter} x ${bookslibrary[number].BookName} - $${bookslibrary[number].BookPrice}.00`);
                
                popDiv.append(`<li>${storage.getItem(number)}`);
                totalSum+=bookslibrary[number].BookPrice;   
                cartIcon.html(`<i class="fas fa-shopping-cart" style="margin-right: 10px;"></i>My Cart: $${totalSum}.00`);
                var checkOutBtn = $('<button id="checkout" style="margin-top: 10px;">Proceed to checkout</button>').click(function () { alert('This is work in progress :('); });
                popDiv.append(checkOutBtn);
            });     
            $(".add-to-cart").on('click', function () {  // increases item counter
                cartCounter = $(".cart-counter").text(`${++counter} Items`);

            });
            comic.on('click', function () {
                for (let i = 0; i < dataSource.view().length; i++) {
                    $(`#product-${i}`).removeClass("hidden");
                    if (view[i].Category !== "Comic") {
                        $(`#product-${i}`).addClass("hidden");
                    }
                }
            });
            fantasy.on('click', function () {

                for (let i = 0; i < dataSource.view().length; i++) {
                    $(`#product-${i}`).removeClass("hidden");
                    if (view[i].Category !== "Fantasy") {
                        $(`#product-${i}`).addClass("hidden");
                    }

                }
            });
            compTech.on('click', function () {

                for (let i = 0; i < dataSource.view().length; i++) {
                    $(`#product-${i}`).removeClass("hidden");
                    if (view[i].Category !== "Computers & Tech") {
                        $(`#product-${i}`).addClass("hidden");
                    }

                }
            });
            cooking.on('click', function () {

                for (let i = 0; i < dataSource.view().length; i++) {
                    $(`#product-${i}`).removeClass("hidden");
                    if (view[i].Category !== "Cooking") {
                        $(`#product-${i}`).addClass("hidden");
                    }

                }
            });
            all.on('click', function () {
                for (let i = 0; i < dataSource.view().length; i++) {
                    $(`#product-${i}`).removeClass("hidden");
                }
            });

        }
    });

    dataSource.read();
});
