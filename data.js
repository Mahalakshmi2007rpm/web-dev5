export const products = [
  {id:"linen-throw",name:"Linen throw",category:"Home",price:128,description:"A soft, substantial layer for cool mornings and slow Sundays. Woven from European flax and finished with a simple fringe.",color:"Sand",image:"https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80"},
  {id:"ceramic-cup",name:"Daily cup",category:"Table",price:34,description:"A quietly beautiful cup for the first coffee of the day. Hand-thrown stoneware with a warm, satin glaze.",color:"Clay",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1000&q=80"},
  {id:"oak-tray",name:"Oak catch-all",category:"Home",price:58,description:"A small landing place for keys, matches, or the things you reach for every day. Made from solid European oak.",color:"Natural oak",image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"},
  {id:"stone-candle",name:"Evening candle",category:"Ritual",price:42,description:"Notes of cedar, smoke, and dried orange in a hand-poured soy wax candle for the hour after dinner.",color:"Charcoal",image:"https://images.unsplash.com/photo-1602607200467-2e6c6d6c6a5a?auto=format&fit=crop&w=1000&q=80"},
  {id:"wool-slippers",name:"Wool slippers",category:"Wear",price:86,description:"Warm, naturally breathable slippers made from felted New Zealand wool and soft recycled cotton.",color:"Oat",image:"https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=1000&q=80"},
  {id:"brass-incense",name:"Brass incense holder",category:"Ritual",price:29,description:"A considered little object for a daily pause. Solid brass, designed to gather ash neatly and age beautifully.",color:"Brass",image:"https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80"}
];

export const categories = ["All", ...new Set(products.map((product) => product.category))];
