<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes"/>

 

  <xsl:template match="/">
<html>
<head>
<title>Report</title>
<style type="text/css">
          h1 {
            text-align: center;
            color: white;
            font-weight: bold;
          }
</style>
</head>
<body>
<div></div>
<h1>Report</h1>
<table border="1">
<tr>
<th>Customer ID</th>
<th>Bidder ID</th>
<th>Item ID</th>
<th>Item Name</th>
<th>Category</th>
<th>Starting Price</th>
<th>Reserve Price</th>
<th>Buy It Now Price</th>
<th>Sold Price</th>
<th>Bid Duration</th>
<th>Status</th>
<th>Current Date time</th>
<th>Revenue</th>
</tr>
<xsl:apply-templates select="auction/item[status='sold' or status='failed']"/>
</table>
<p>Total number of sold items: <xsl:value-of select="count(auction/item[status='sold'])"/></p>
<p>Total number of failed items: <xsl:value-of select="count(auction/item[status='failed'])"/></p>
<p>Total revenue: $<xsl:call-template name="calculateTotalRevenue"/></p>

 

      </body>
</html>
</xsl:template>

 

  <xsl:template match="item">
<tr>
<td><xsl:value-of select="sellercustomerid"/></td>
<td><xsl:value-of select="bidcustomerid"/></td>
<td><xsl:value-of select="itemNumber"/></td>
<td><xsl:value-of select="itemName"/></td>
<td><xsl:value-of select="category"/></td>
<td><xsl:value-of select="currentBidPrice"/></td>
<td><xsl:value-of select="reservePrice"/></td>
<td><xsl:value-of select="buyItNowPrice"/></td>
<td><xsl:value-of select="startPrice"/></td>
<td><xsl:value-of select="concat(durationDays, ' days, ', durationHours, ' hours, ', durationMinutes, ' minutes')"/></td>
<td><xsl:value-of select="status"/></td>
<td><xsl:value-of select="auctionStartDate"/></td>
<td>
<xsl:choose>
<xsl:when test="status='sold'">$<xsl:value-of select="startPrice * 0.03"/></xsl:when>
<xsl:when test="status='failed'">$<xsl:value-of select="reservePrice * 0.01"/></xsl:when>
</xsl:choose>
</td>
</tr>

</xsl:template>
<xsl:template name="calculateTotalRevenue">
<xsl:param name="items" select="auction/item[status='sold' or status='failed']"/>
<xsl:param name="totalRevenue" select="0"/>
<xsl:choose>
<xsl:when test="count($items) > 0">
<xsl:variable name="item" select="$items[1]" />
<xsl:variable name="revenue">
<xsl:choose>
<xsl:when test="$item/status='sold'">
<xsl:value-of select="$item/startPrice * 0.03"/>
</xsl:when>
<xsl:when test="$item/status='failed'">
<xsl:value-of select="$item/reservePrice * 0.01"/>
</xsl:when>
</xsl:choose>
</xsl:variable>
<xsl:call-template name="calculateTotalRevenue">
<xsl:with-param name="items" select="$items[position() > 1]"/>
<xsl:with-param name="totalRevenue" select="$totalRevenue + $revenue"/>
</xsl:call-template>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="$totalRevenue"/>
</xsl:otherwise>
</xsl:choose>
</xsl:template>
</xsl:stylesheet>