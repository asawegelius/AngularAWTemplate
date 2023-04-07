'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angular-template documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountsModule.html" data-type="entity-link" >AccountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountsModule-ab6d9e4af765b84c64199ff3989c88c7c839284526755be6bbd01887b32b2438624739ffc09251d37f630af172293714a6d8797b3d86519bf022de971faf897b"' : 'data-target="#xs-components-links-module-AccountsModule-ab6d9e4af765b84c64199ff3989c88c7c839284526755be6bbd01887b32b2438624739ffc09251d37f630af172293714a6d8797b3d86519bf022de971faf897b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountsModule-ab6d9e4af765b84c64199ff3989c88c7c839284526755be6bbd01887b32b2438624739ffc09251d37f630af172293714a6d8797b3d86519bf022de971faf897b"' :
                                            'id="xs-components-links-module-AccountsModule-ab6d9e4af765b84c64199ff3989c88c7c839284526755be6bbd01887b32b2438624739ffc09251d37f630af172293714a6d8797b3d86519bf022de971faf897b"' }>
                                            <li class="link">
                                                <a href="components/CustomersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AccountsRoutingModule.html" data-type="entity-link" >AccountsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' : 'data-target="#xs-components-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' :
                                            'id="xs-components-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' }>
                                            <li class="link">
                                                <a href="components/AccountsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccountsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountsPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' : 'data-target="#xs-injectables-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' :
                                        'id="xs-injectables-links-module-AppModule-8f8a7e6c67935316e6189b2708dc1f0cf829246904079b634cba966e35deda388cf53a6506891725a9734bb66d7d82eb0d63d3239110a57ac6edfbfe1c00a4a2"' }>
                                        <li class="link">
                                            <a href="injectables/Endpoints.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Endpoints</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CustomersModule.html" data-type="entity-link" >CustomersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CustomersModule-00c67e9ae75e249e84dee6ff0e4a4bdffdf03c7c722ed2962afea92cb513cc50cb8464531fd48429cd32f3a45ba069609555118af2a9d29d1e32fc08ef2d3036"' : 'data-target="#xs-components-links-module-CustomersModule-00c67e9ae75e249e84dee6ff0e4a4bdffdf03c7c722ed2962afea92cb513cc50cb8464531fd48429cd32f3a45ba069609555118af2a9d29d1e32fc08ef2d3036"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CustomersModule-00c67e9ae75e249e84dee6ff0e4a4bdffdf03c7c722ed2962afea92cb513cc50cb8464531fd48429cd32f3a45ba069609555118af2a9d29d1e32fc08ef2d3036"' :
                                            'id="xs-components-links-module-CustomersModule-00c67e9ae75e249e84dee6ff0e4a4bdffdf03c7c722ed2962afea92cb513cc50cb8464531fd48429cd32f3a45ba069609555118af2a9d29d1e32fc08ef2d3036"' }>
                                            <li class="link">
                                                <a href="components/CustomersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomersRoutingModule.html" data-type="entity-link" >CustomersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ModalModule.html" data-type="entity-link" >ModalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ModalModule-af1d4a0350df1ee0987c750b566c6799e5c7a873e8ab13dbd2409e6e6ff66d5095788e65073b1fa8b9ff513f7aeac611884ffcdec6d9c2da3cdb008a36e4621b"' : 'data-target="#xs-components-links-module-ModalModule-af1d4a0350df1ee0987c750b566c6799e5c7a873e8ab13dbd2409e6e6ff66d5095788e65073b1fa8b9ff513f7aeac611884ffcdec6d9c2da3cdb008a36e4621b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ModalModule-af1d4a0350df1ee0987c750b566c6799e5c7a873e8ab13dbd2409e6e6ff66d5095788e65073b1fa8b9ff513f7aeac611884ffcdec6d9c2da3cdb008a36e4621b"' :
                                            'id="xs-components-links-module-ModalModule-af1d4a0350df1ee0987c750b566c6799e5c7a873e8ab13dbd2409e6e6ff66d5095788e65073b1fa8b9ff513f7aeac611884ffcdec6d9c2da3cdb008a36e4621b"' }>
                                            <li class="link">
                                                <a href="components/ModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResponsiveSideNavigationModule.html" data-type="entity-link" >ResponsiveSideNavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ResponsiveSideNavigationModule-5e7d02066ddb3cb8ccd4421278f107f75e8a90c042a6e25da572a52ef6658a811974d4ea680b3590a6e33bb69221e6682e82fd2c35d6cc498bfd016dff090bd7"' : 'data-target="#xs-components-links-module-ResponsiveSideNavigationModule-5e7d02066ddb3cb8ccd4421278f107f75e8a90c042a6e25da572a52ef6658a811974d4ea680b3590a6e33bb69221e6682e82fd2c35d6cc498bfd016dff090bd7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ResponsiveSideNavigationModule-5e7d02066ddb3cb8ccd4421278f107f75e8a90c042a6e25da572a52ef6658a811974d4ea680b3590a6e33bb69221e6682e82fd2c35d6cc498bfd016dff090bd7"' :
                                            'id="xs-components-links-module-ResponsiveSideNavigationModule-5e7d02066ddb3cb8ccd4421278f107f75e8a90c042a6e25da572a52ef6658a811974d4ea680b3590a6e33bb69221e6682e82fd2c35d6cc498bfd016dff090bd7"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SideNavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SideNavigationComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-30b8a3f9c13a0a66b6479bef5f7e794b944d51c2b8224d7be072164e8285ded9beb03a8dc5eece9142ea8ee3b6f311e2be97b09c65cb3db932cd2037de353b9e"' : 'data-target="#xs-components-links-module-SharedModule-30b8a3f9c13a0a66b6479bef5f7e794b944d51c2b8224d7be072164e8285ded9beb03a8dc5eece9142ea8ee3b6f311e2be97b09c65cb3db932cd2037de353b9e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-30b8a3f9c13a0a66b6479bef5f7e794b944d51c2b8224d7be072164e8285ded9beb03a8dc5eece9142ea8ee3b6f311e2be97b09c65cb3db932cd2037de353b9e"' :
                                            'id="xs-components-links-module-SharedModule-30b8a3f9c13a0a66b6479bef5f7e794b944d51c2b8224d7be072164e8285ded9beb03a8dc5eece9142ea8ee3b6f311e2be97b09c65cb3db932cd2037de353b9e"' }>
                                            <li class="link">
                                                <a href="components/EditCellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditCellComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableWithEditCellComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableWithEditCellComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MockCustomer.html" data-type="entity-link" >MockCustomer</a>
                            </li>
                            <li class="link">
                                <a href="classes/MockCustomerType.html" data-type="entity-link" >MockCustomerType</a>
                            </li>
                            <li class="link">
                                <a href="classes/QueryStringParameters.html" data-type="entity-link" >QueryStringParameters</a>
                            </li>
                            <li class="link">
                                <a href="classes/RouterSerializer.html" data-type="entity-link" >RouterSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Table.html" data-type="entity-link" >Table</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableColumn.html" data-type="entity-link" >TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableHeader.html" data-type="entity-link" >TableHeader</a>
                            </li>
                            <li class="link">
                                <a href="classes/UrlBuilder.html" data-type="entity-link" >UrlBuilder</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CreateUrlService.html" data-type="entity-link" >CreateUrlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerApiService.html" data-type="entity-link" >CustomerApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerEffects.html" data-type="entity-link" >CustomerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomersTableService.html" data-type="entity-link" >CustomersTableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Endpoints.html" data-type="entity-link" >Endpoints</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalEffects.html" data-type="entity-link" >ModalEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResourceService.html" data-type="entity-link" >ResourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TableService.html" data-type="entity-link" >TableService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Account.html" data-type="entity-link" >Account</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountPost.html" data-type="entity-link" >AccountPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EditRowInfo.html" data-type="entity-link" >EditRowInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorState.html" data-type="entity-link" >ErrorState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomer.html" data-type="entity-link" >ICustomer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICustomerType.html" data-type="entity-link" >ICustomerType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IState.html" data-type="entity-link" >IState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterState.html" data-type="entity-link" >RouterState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link" >State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State-1.html" data-type="entity-link" >State</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});