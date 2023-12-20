import ProductCardStyleOne from './Cards/ProductCardStyleOne'
import DataIteration from './DataIteration'
import ViewMoreTitle from './ViewMoreTitle'

export default function SectionStyleThree({
  className,
  sectionTitle,
  seeMoreUrl,
  products = [],
}) {

  console.log(products)
  return (
    <div className={`section-style-one `}>
      <div className={`section-wrapper w-full `}>
        <div className="container-x mx-auto">
          <div className="section-content">
            <div className="products-section w-full">
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
                <DataIteration datas={products} startLength={0} endLength={8}>
                  {({ datas }) => (
                    <div data-aos="fade-up" key={datas.id} className="item">
                      <ProductCardStyleOne datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
