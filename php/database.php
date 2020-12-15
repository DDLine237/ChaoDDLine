<?php
// Define PostgreSQL database server connect parameters.
define('PG_HOST', 'ec2-54-211-238-131.compute-1.amazonaws.com');
define('PG_PORT', 5432);
define('PG_DATABASE', 'daa13krlt557vh');
define('PG_USER', 'jkojilodturfah');
define('PG_PASSWORD', 'd2f891ba28a2643abdc6215c651d2e8bcd7f43e8629e574865a00cb54dd94abb');
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