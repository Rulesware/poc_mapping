<!--<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:param name="discount"/>
	<xsl:template match="/">
		<order>
			<xsl:variable name="sub-total" select="sum(//price)"/>
			<total>
				<xsl:value-of select="$sub-total"/>
			</total>15% discount if paid by: 
			<xsl:value-of select="$discount"/>
		</order>
	</xsl:template>
</xsl:stylesheet>-->


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

	<order>
		<xsl:for-each select="catalog/cd">
      		<albums>
      			<title>
        			<xsl:value-of select="title"/>
        		</title>
        		<artist>
        			<xsl:value-of select="artist"/>
        		</artist>
      		</albums>
    	</xsl:for-each>
	</order>


</xsl:template>
</xsl:stylesheet>
