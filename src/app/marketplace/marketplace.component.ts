import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ProductService } from "../services/product.service";
import { PlayerService } from "../services/player.service";
import { ToastrService } from "ngx-toastr";
import { EventService } from "../services/eventEmitter.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { Observable } from 'rxjs/Observable';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: "app-marketplace",
  templateUrl: "./marketplace.component.html",
  styleUrls: ["./marketplace.component.css"]
})
export class MarketplaceComponent implements OnInit {
  playerCode: string;
  playerData: any;
  productList: any;
  platformType: string;
  productCategory: string;
  product: any;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private playerService: PlayerService,
    private _messageService: EventService,
    private toaster: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
  ) {

    this.playerCode = this.auth.getLoggedInPlayer().code;
    this.platformType = "pc";
    this.productCategory = 'games';

    this._messageService.listen().subscribe((m: any) => {
      //this.setPlatformType(m);
      this.setProductCategory(m);
    });
  }


  ngOnInit() {
    this.platformType = "pc";
    this.productService.getAllProducts(this.productCategory,this.platformType).subscribe(
      data => {
        if (data["products"]) {
          this.productList = data["products"];
        }
      },
      errObj => {
        this.toaster.error("Error", errObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }


  setProductCategory(value) {

    this.productCategory = value;

    this.productService.getAllProducts(this.productCategory,this.platformType).subscribe(
      data => {
        if (data["products"]) {
          this.productList = data["products"];
        }
      },
      errObj => {
        this.toaster.error("Error", errObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }


  setPlatformType(value) {

    this.platformType = value;

    this.productService.getAllProducts(this.productCategory,this.platformType).subscribe(
      data => {
        if (data["products"]) {
          this.productList = data["products"];
        }
      },
      errObj => {
        this.toaster.error("Error", errObj.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
        });
      }
    );
  }



  /** Order button on product was clicked
  ** Load the product, check there is enough in stock
  ** check the player has enough balance
  ** if all OK, then show the order modal with the data
  **/
  initiateOrderModal(productId: any){

    // Get this product data from API
    let productData = this.productService.getProduct(productId);

    // Get most live data on player
    let playerData = this.playerService.getPlayer();

    forkJoin([productData, playerData]).subscribe(result => {

      this.product = result[0]["product"];
      this.playerData = result[1]["player"];


      // Verify this product has enough qty in stock
      if(this.product.qty < 1){
        let invalidActionModalData = {title: "Product not in stock",messages: ["Sorry, our store is currently out of stock of this item."]};
        this.ngxSmartModalService.setModalData(invalidActionModalData, 'invalidActionModal');
        this.ngxSmartModalService.getModal('invalidActionModal').open();
        return;
      }

      // Verify the user has enough FORCE to purchase
      if(this.playerData.forceBalance < this.product.forcePrice){
        let invalidActionModalData = {title: "Not enough FORCE to purchase",messages: ["Sorry, you do not have enough Force available to purchase this item."]};
        this.ngxSmartModalService.setModalData(invalidActionModalData, 'invalidActionModal');
        this.ngxSmartModalService.getModal('invalidActionModal').open();
        return;
      }
      
      // Load this products information to present to user to purchase
      this.ngxSmartModalService.setModalData(this.product, 'orderProductModal');
      this.ngxSmartModalService.getModal('orderProductModal').open();
    },
    err => {
      this.toaster.error("Error", err.error.err, {
          timeOut: 3000,
          positionClass: "toast-top-center"
      });
    });
  }


}