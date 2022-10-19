<?php
    // get_template_part('theme-options');

    class trueOptionsPage{
 
        public $page_slug;
        public $option_group;
     
        function __construct() {
            // это у нас используется много где, поэтому давайте вынесем как отдельное свойство
            $this->page_slug = 'themeSettingsPage';
            $this->option_group = 'themeSettings';
     
            add_action( 'admin_menu', array( $this, 'add' ), 25 );
            add_action( 'admin_init', array( $this, 'settings' ) );
            add_action( 'admin_notices', array( $this, 'notice' ) );
     
        }
     
        function add(){
     
            add_menu_page( 'Настройки темы', 'Настройки темы', 'manage_options', $this->page_slug, array( $this, 'display' ), 'dashicons-hammer', 20 );
     
        }
     
        function display() {
     
            echo '<div class="wrap">
                <h1>' . get_admin_page_title() . '</h1>
                <form method="post" action="options.php">';
     
                settings_fields( $this->option_group );
                do_settings_sections( $this->page_slug );
                submit_button(); 
     
            echo '</form></div>';
     
        }
     
        function settings(){

            register_setting( $this->option_group, 'siteLogo');
            add_settings_section( 'logoSectionId', '', '', $this->page_slug );
            add_settings_field('siteLogo', 
                "Логотип сайта", 
                array( $this, 'logo' ),
                $this->page_slug,
                "logoSectionId",
                array(
                    'name' => 'siteLogo',
                )
            );
     
            // register_setting( $this->option_group, 'number_of_slider_slides', 'absint' );
     
            // add_settings_section( 'slider_settings_section_id', '', '', $this->page_slug );
     
            // add_settings_field(
            //     'number_of_slider_slides',
            //     'Количество слайдов в слайдере',
            //     array( $this, 'field' ),
            //     $this->page_slug,
            //     'slider_settings_section_id',
            //     array(
            //         'label_for' => 'number_of_slider_slides',
            //         'class' => 'misha-class',
            //         'name' => 'number_of_slider_slides',
            //     )
            // );
     
        }

        function logo($args) {
            // получаем значение из базы данных
            // $value = get_option( $args[ 'name' ] );
     
            printf(
                '<input type="file" name="%s" />',
                esc_attr( $args[ 'name' ] )
            );
        }
     
        function field( $args ){
            // получаем значение из базы данных
            $value = get_option( $args[ 'name' ] );
     
            printf(
                '<input type="number" min="1" id="%s" name="%s" value="%s" />',
                esc_attr( $args[ 'name' ] ),
                esc_attr( $args[ 'name' ] ),
                absint( $value )
            );
     
        }
     
        function notice() {
     
            if(
                isset( $_GET[ 'page' ] )
                && $this->page_slug == $_GET[ 'page' ]
                && isset( $_GET[ 'settings-updated' ] )
                && true == $_GET[ 'settings-updated' ]
            ) {
                echo '<div class="notice notice-success is-dismissible"><p>Слайдер сохранён!</p></div>';
            }
     
        }
     
    }
     
    new trueOptionsPage();
?>