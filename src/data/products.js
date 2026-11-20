// Product photos live in /public/images (look-NN.jpg). Add more entries to `images` for extra gallery shots.
const rows=[
[1,"Brown Plaid Flannel & Wide-Leg Set","women","shirts",185,0,["Camel","Ecru"]],
[2,"Charcoal Plaid Flannel & Black Wide Denim","women","shirts",190,230,["Black"]],
[3,"Star Patch Wide Denim & Layered Tee","women","trousers",165,0,["Black"]],
[5,"Vintage Graphic Tee & Faded Wide Denim","women","t-shirts",120,0,["Black","Navy"]],
[6,"Western Graphic Tee & Plaid Wrap Cargo","women","t-shirts",150,0,["Camel"]],
[7,"Maroon Keyhole Kurta & Bow Palazzo Set","women","co-ords",210,260,["Maroon","Ecru"]],
[8,"Mauve Scallop-Edge Tunic & Palazzo Set","women","co-ords",225,0,["Mauve"]],
[9,"Gingham Babydoll Shirt & Wide Trousers","women","shirts",140,0,["Grey","Ecru"]],
[10,"Red Gingham Peplum Blouse & Wide Denim","women","shirts",130,160,["Maroon","Navy"]],
[11,"Burgundy Striped Knit Polo & Cord Trousers","women","knitwear",155,0,["Maroon","Ecru"]],
[12,"Olive Short-Sleeve Shirt & Stone Wide Jeans","men","shirts",145,0,["Olive","Ecru"]],
[13,"Quarter-Zip Knit & Washed Black Wide Denim","men","knitwear",175,0,["Black","Grey"]],
[14,"Cable Knit Sweater & Black Trousers","men","knitwear",170,0,["Olive","Black"]],
[15,"Gothic Print Shirt & Wide Black Trousers","men","shirts",135,0,["White","Black"]],
[16,"Striped Shirt, Blazer & Black Wide Jeans","women","jackets",260,310,["Black"]],
[17,"Washed Denim Jacket, Hoodie & Cargo","men","jackets",240,0,["Black"]],
[18,"Moto Racing Jacket & Cargo Denim","men","jackets",280,0,["Black","Grey"]],
[19,"Studded Black Jacket & White Wide Trousers","men","jackets",250,0,["Black","White"]]];
export const products=rows.map(([n,name,gender,category,price,o,colors],i)=>({id:String(i+1),name,gender,category,price,originalPrice:o||null,
 description:`${name}: a complete look cut from considered fabrics with a relaxed, wide-leg silhouette. Designed in Milan, made in small runs.`,
 material:"Cotton, wool or denim blend depending on piece. Cold wash, dry flat, iron on low.",sizes:["XS","S","M","L","XL"],colors,
 images:[`/images/look-${String(n).padStart(2,'0')}.jpg`],rating:+(4+((i*7)%10)/10).toFixed(1),inStock:true,isNew:i%3===0,featured:i%4===0,popularity:100-i*3}));
export const categories=["shirts","t-shirts","trousers","knitwear","jackets","co-ords"];
export const swatch={Black:"#111",White:"#f4f4f4",Ecru:"#e8dfcf",Camel:"#b98a5b",Olive:"#6b6b3a",Navy:"#1d2a44",Maroon:"#6b1d2a",Mauve:"#8f6f7c",Grey:"#6e6e6e"};
