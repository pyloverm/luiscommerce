import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
        var taxe_peso = 0;
        var totalQuantities = 0;
        var tax_id = '';

        req.body.forEach(element => {
            taxe_peso += element.peso * element.quantity
            totalQuantities += element.quantity
        });

        if( totalQuantities <= 2  && taxe_peso <= 20){
            tax_id = 'shr_1MTzyFBb7RwAdRQ63aIpuqai'
        }else if(taxe_peso <= 20){
            tax_id = 'shr_1MU002Bb7RwAdRQ67dgg5pkR'
        }else{
            tax_id = 'shr_1MU012Bb7RwAdRQ6Uhpaqcjo'
        }

        const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection:{
            allowed_countries:['PT']
        },
        shipping_options: [
          { shipping_rate: tax_id},
        ],
        tax_id_collection:{ enabled: false},
        line_items: req.body.map((item) => {
        const newImage = item.imagem

        return {
            price_data: { 
              currency: 'eur',
              product_data: { 
                name: item.nome,
                images: [newImage],
              },
              unit_amount: Math.round(item.preco * 100),
            },
            adjustable_quantity: {
              enabled:false,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.

      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
