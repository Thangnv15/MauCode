myapp.service('CartService', function() {
   var cart = JSON.parse(localStorage.getItem('cart')) || [];

    this.getCart = function() {
        return cart;
    };

    this.addToCart = function(watch) {
        var existingWatch = cart.find(item => item.id === watch.id);

        if (existingWatch) {
            existingWatch.quantity++;
        } else {
            if(!watch.quantity){
                watch.quantity = 1;
                cart.push(watch);
            }else{
                cart.push(watch);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    this.addToCartDetail = function(watch){
        var existingWatch = cart.find(item => item.id === watch.id);

        if (existingWatch) {
            existingWatch.quantity+= watch.quantity;
        } else {
            if(!watch.quantity){
                watch.quantity = 1;
                cart.push(watch);
            }else{
                cart.push(watch);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    this.clearCart = function() {
        cart = [];
        localStorage.removeItem('cart');
    };

    this.removeFromCart = function(productId) {
        var index = -1;
    
        // Tìm vị trí của sản phẩm có ID trùng với productId trong giỏ hàng
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].id === productId) {
                index = i;
                break;
            }
        }
    
        // Nếu tìm thấy sản phẩm, xóa nó khỏi giỏ hàng
        if (index !== -1) {
            cart.splice(index, 1);
        }
        // Cập nhật giỏ hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };
});