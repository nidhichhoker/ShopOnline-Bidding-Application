<?php
try {
    // Load the XML data
    libxml_use_internal_errors(true);
    $xml = new DOMDocument();
    $xml->load('../../data/auction.xml'); // Update the path to your XML file.

    // Load the XSLT stylesheet
    $xsl = new DOMDocument();
    $xsl->load('../../htdocs/Project2/ReportTable.xsl'); // Update the path to your XSLT stylesheet.

    // Create an XSLT processor
    $proc = new XSLTProcessor();
    $proc->importStylesheet($xsl);

    // Apply the transformation
    $html = $proc->transformToXML($xml);

    // Set the Content-Type header to specify that the response is HTML
    header('Content-Type: text/html');

    // Output the transformed HTML
    echo $html;
} catch (Exception $e) {
    echo "XSLT transformation failed: " . $e->getMessage();
}
?>
