import axios from "axios";

const getItems = (search: string) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://umico.az/catalog/v3/market/products?from_search=true&per_page=24&include_fields=id%2Cold_price%2Cretail_price%2Cavailability%2Cpreorder_available%2Cdefault_offer_id%2Cimg_url_thumbnail%2Cname%2Cmanufacturer%2Cavail_check%2Cstatus%2Cslugged_name%2Cdiscount%2Cdefault_marketing_name%2Cratings%2Coffers%2Coffers.retail_price%2Coffers.id%2Coffers.marketing_name%2Coffers.merchant_uuid%2Ccategory_id%2Cdefault_offer_allow_qty%2Coffers.uuid%2Coffers.partner_rating%2Cdefault_merchant_rating%2Cqty%2Cdefault_stock_control_mode%2Cdefault_show_stock_qty_threshold%2Cbest_installment_offer_id%2Coffers.supplier_id%2Cis_bulk_heavy%2Cdefault_merchant_uuid%2Coffers.seller_marketing_name%2Ccategories%2Cdefault_offer_allow_qty%2Cproduct_labels%2Cloyalty_cashback%2Cmin_qty%2Cdiscounted%2Coffers.installment_enabled%2Coffers.max_installment_months%2Coffers.avail_check%2Coffers.old_price&exclude_fields=ratings.questions%2Cratings.assessment_id%2Cratings.product_id&q%5Bopaque_id%5D=%2Fsearch%2F${search}%3Ffrom_search%3Dtrue&q%5Bfull_text%5D=${search}&q%5Bmanufacturer_mode%5D=false&q%5Bsearch_mode%5D=all_items&q%5Bs%5D=id%20boosted_score&q%5Bstatus_in%5D=out_of_stock%2Cactive%2Cunavailable&q%5Bmarket_order%5D=true`,
    headers: {},
  };

  return axios
    .request(config)
    .then((response) => {
      response.data.products.forEach((product) => {
        console.log(product);
      });
      //   console.log(JSON.stringify(response.data));
      return response.data.products;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getItems;
