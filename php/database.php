<?php
// Define PostgreSQL database server connect parameters.
define('PG_HOST', 'ec2-54-205-26-79.compute-1.amazonaws.com');
define('PG_PORT', 5432);
define('PG_DATABASE', 'd65ofmmfvhc7lv');
define('PG_USER', 'eofumljuhvpscl');
define('PG_PASSWORD', 'a0802a932206f7fb68240da0d77c6193ca0df70b60a1fb8b905af881e95e1322');
define('ERROR_ON_CONNECT_FAILED', 'Connection failed!');

// Merge connect string and connect db server with default parameters.
function getDB() {
    return pg_pconnect (' host=' . PG_HOST .
                        ' port=' . PG_PORT .
                        ' dbname=' . PG_DATABASE .
                        ' user=' . PG_USER .
                        ' password=' . PG_PASSWORD
                       ) or die (ERROR_ON_CONNECT_FAILED);
}
?>