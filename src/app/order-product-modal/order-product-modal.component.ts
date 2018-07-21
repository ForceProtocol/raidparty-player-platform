import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from "ngx-smart-modal";
import { AuthService } from "../services/auth.service";
import { ProductService } from "../services/product.service";
import { PlayerService } from "../services/player.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-order-product-modal',
  templateUrl: './order-product-modal.component.html',
})
export class OrderProductModalComponent implements OnInit {
	player: any;
	playerData: any;
	product: any;
	showLegalWarning: boolean;
	confirmLegal: boolean;

	constructor(
		public ngxSmartModalService: NgxSmartModalService,
		private auth: AuthService,
	    private productService: ProductService,
	    private playerService: PlayerService,
	    public toaster: ToastrService
	    ) { 
		this.player = this.auth.getLoggedInPlayer();
		this.showLegalWarning = false;
		this.confirmLegal = false;
	}

	ngOnInit() {
	}

	clearModalData(modalId) {
		this.confirmLegal = false;
		this.showLegalWarning = false;
		this.ngxSmartModalService.resetModalData(modalId);
	}


	confirmLegalAgreement(confirmLegal: boolean){
		this.showLegalWarning = !confirmLegal;
	}

	confirmProductOrder(orderData) {

	    // Get this product data from API
	    let productData = this.productService.getProduct(orderData.productId);

	    // Get most live data on player
	    let playerData = this.playerService.getPlayer();

	    forkJoin([productData, playerData]).subscribe(result => {

	      this.product = result[0]["product"];
	      this.playerData = result[1]["player"];


	      // Verify this product has enough qty in stock
	      if(this.product.qty < 1){
      		// Close the current open order product modal
      		this.ngxSmartModalService.getModal('orderProductModal').close();

	        let invalidActionModalData = {title: "Product not in stock",messages: ["Sorry, our store is currently out of stock of this item."]};
	        this.ngxSmartModalService.setModalData(invalidActionModalData, 'invalidActionModal');
	        this.ngxSmartModalService.getModal('invalidActionModal').open();
	        return;
	      }

	      // Verify the user has enough FORCE to purchase
	      if(this.playerData.forceBalance < this.product.forcePrice){
	      	// Close the current open order product modal
      		this.ngxSmartModalService.getModal('orderProductModal').close();

	        let invalidActionModalData = {title: "Not enough FORCE to purchase",messages: ["Sorry, you do not have enough Force available to purchase this item."]};
	        this.ngxSmartModalService.setModalData(invalidActionModalData, 'invalidActionModal');
	        this.ngxSmartModalService.getModal('invalidActionModal').open();
	        return;
	      }

	      // Confirm that the user checked the legal agreement checkbox
	      if(orderData.confirmLegal){

	      	// Get most live data on player
	    	let playerOrder = this.playerService.confirmPlayerOrder(orderData.productId);

	    	playerOrder.subscribe(result => {
	    		let playerOrderData = result["result"];

	    		// Players order was completed
	    		if(playerOrderData.success){
    				this.toaster.success("Success", "Your order has been confirmed. Please check your email inbox for the game key.", {
			          timeOut: 3000,
			          positionClass: "toast-top-center"
			      	});
	    		}else{
	    			this.toaster.error("Error", playerOrderData.message, {
			          timeOut: 3000,
			          positionClass: "toast-top-center"
		      		});
	    		}

	    		this.ngxSmartModalService.getModal('orderProductModal').close();
	    	}, err => {
		      this.toaster.error("Error", err.error.err, {
		          timeOut: 3000,
		          positionClass: "toast-top-center"
		      });
		    });

	      }else{
	      	this.showLegalWarning = true;
	      }

	    },
	    err => {
	      this.toaster.error("Error", err.error.err, {
	          timeOut: 3000,
	          positionClass: "toast-top-center"
	      });
	    });
	}
}