
import { Panel, PanelBody,  RangeControl, ToggleControl, TextareaControl, ToolbarButton   } from '@wordpress/components';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { numSlides, blockID, nextBtnSvg, prevBtnSvg, loop, itemPerDesktop, itemPerTab,  itemPerMobile, autoplay, dots, nav, margin, enableCustomJS, customJSCode} = attributes;
	setAttributes({blockID: clientId})
	const blockProps = useBlockProps();
	const CAROUSEL_ITEMS_TEMPLATE = [
		[ 'ekwa-blocks/carousel-item', {} ],
		[ 'ekwa-blocks/carousel-item', {} ]
	];
	const carouselID = 'ekwa-' + blockID + '-carousel';
	const carouselClass = 'owl-carousel owl-theme ' + carouselID;







	return (
		<>
		<InspectorControls>

			<Panel>
				<PanelBody
				title='Loop'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Loop"
					help={
						loop
							? 'True.'
							: 'False.'
					}
					checked={ loop }
					onChange={ (state) => {
						 setAttributes({loop: state})
					} }
       			 />

				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Sliders Per Device'
				initialOpen={ false }
				>
				<RangeControl
					label="Slides per Desktop"
					value={ itemPerDesktop }
					onChange={ ( value ) => setAttributes({itemPerDesktop: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				<RangeControl
					label="Slides per Tab"
					value={ itemPerTab }
					onChange={ ( value ) => setAttributes({itemPerTab: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				<RangeControl
					label="Slides per Mobile"
					value={ itemPerMobile }
					onChange={ ( value ) => setAttributes({itemPerMobile: value}) }
					min={ 1 }
					max={ 20 }
        		/>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Auto Play'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Autoplay"
					help={
						autoplay
							? 'True.'
							: 'False.'
					}
					checked={ autoplay }
					onChange={ (state) => {
						 setAttributes({autoplay: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Dots'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel Dots"
					help={
						dots
							? 'True.'
							: 'False.'
					}
					checked={ dots }
					onChange={ (state) => {
						 setAttributes({dots: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Navigation'
				initialOpen={ false }
				>
				<ToggleControl
					label="Carousel navigation"
					help={
						nav
							? 'True.'
							: 'False.'
					}
					checked={ nav }
					onChange={ (state) => {
						 setAttributes({nav: state})
					} }
       			 />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				title='Margin between items'
				initialOpen={ false }
				>
				<RangeControl
					label="Margin"
					value={ margin }
					onChange={ ( value ) => setAttributes({margin: value}) }
					min={ 0 }
					max={ 200 }
        		/>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				 title='Custom Navigation Icon '
				 initialOpen={ false }
				 >
				<TextareaControl
					label="SVG Prev Icon"
					help="Enter svg code"
					value={ prevBtnSvg }
					onChange={ ( value ) => setAttributes( {prevBtnSvg: value} ) }
        		/>
				<br />
				<TextareaControl
					label="SVG Next Icon"
					help="Enter svg code"
					value={ nextBtnSvg }
					onChange={ ( value ) => setAttributes( {nextBtnSvg: value} ) }
        		/>


				</PanelBody>
			</Panel>
			<Panel>
				<PanelBody
				 title='Custom JavaScript Initialization'
				 initialOpen={ false }
				 >
				<ToggleControl
					label="Enable Custom JS"
					help={
						enableCustomJS
							? 'Custom initialization enabled.'
							: 'Using default settings.'
					}
					checked={ enableCustomJS }
					onChange={ (state) => {
						setAttributes({enableCustomJS: state});
						// Pre-fill with starter code when enabled
						if (state && !customJSCode) {
							setAttributes({
								customJSCode: `$('.${carouselID}').owlCarousel({\n  loop: true,\n  margin: 10,\n  nav: true,\n  dots: true,\n  autoplay: false,\n  responsive: {\n    0: { items: 1 },\n    600: { items: 2 },\n    1000: { items: 3 }\n  },\n  onInitialized: onInitialized\n});`
							});
						}
					} }
       			 />
				 {enableCustomJS && (
					 <>
						<p style={{ marginBottom: '10px', fontSize: '12px', color: '#666' }}>
							Add your custom Owl Carousel initialization below. Use the selector <code>.{carouselID}</code> to target this carousel.
							<br/><strong>Important:</strong> Include <code>onInitialized: onInitialized</code> callback to show the carousel.
						</p>
						<TextareaControl
							label="Custom Initialization Code"
							help="Write your owlCarousel() configuration object"
							value={ customJSCode }
							onChange={ ( value ) => setAttributes( {customJSCode: value} ) }
							rows={15}
							style={{ fontFamily: 'monospace', fontSize: '12px' }}
						/>
					</>
				)}
				</PanelBody>
			</Panel>
		</InspectorControls>

		<script>{`
         owlSettings.push({
			"nav_id"			:	"${blockID}",
            "class"             :  	"${carouselID}",
            "loop"              :   ${loop},
            "per_page_desktop"  :   ${itemPerDesktop},
            "per_page_tab"      :   ${itemPerTab},
            "per_page_mobile"   :   ${itemPerMobile},
            "autoplay"          :   ${autoplay},
            "dots"              :   ${dots},
            "navigation"        :   ${nav},
            "margin"            :   ${margin},
         });

        `}
	</script>
	<div className=' ekwa-carousel-wrapper'>
		<div  { ...blockProps }>
		<InnerBlocks
			allowedBlocks={['ekwa-blocks/carousel-item']}
			template={ CAROUSEL_ITEMS_TEMPLATE }
			renderAppender={ InnerBlocks.ButtonBlockAppender }
		/>
		</div>


		{prevBtnSvg
        ? <button type="button" role="presentation" className={`ekwa-${blockID}-prev ekwa-owl-prev`}>
            <span aria-label="Previous" dangerouslySetInnerHTML={{ __html: prevBtnSvg }}></span>
          </button>
        : null
      	}
		{nextBtnSvg
		 ? <button type="button" role="presentation" className={`ekwa-${blockID}-next ekwa-owl-next`}>
		     <span aria-label="Next" dangerouslySetInnerHTML={{ __html: nextBtnSvg }}></span>
		   </button>
		 : null
		}
	</div>
		</>
	);
}
