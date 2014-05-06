<!--<xsl:stylesheet version="1.0" xsl:value-of select="titlexmlns:xsl="http://www.w3.org/1999/XSL/Transform">
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
</xsl:stylesheet>


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/" name="for-loop">

    	<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://sample.bpmn2.org/bpmn2/sample/process">
    		
    		<xsl:param name="count" select="10"/>

		    <xsl:if test="$count > 0">
		        <xsl:value-of select="$count"/>
		        <xsl:call-template name="for-loop">
		            <xsl:with-param name="count" select="$count - 1"/>
		        </xsl:call-template>
		    </xsl:if>
    		
    	</bpmn2:definitions>

    </xsl:template>
</xsl:stylesheet>

-->


<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/" name="for-loop">

    	<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://sample.bpmn2.org/bpmn2/sample/process">

    		<bpmn2:process id="process" name="Default Process" processType="Public">

	    		<xsl:for-each select="structure/process/list">
	    			<bpmn2:task id="{ShapeID}" name="Check availability">
				      <bpmn2:incoming>
				      	<xsl:value-of select="incoming"/>
				      </bpmn2:incoming>
				      <bpmn2:outgoing>
				      	<xsl:value-of select="outgoing"/>
				      </bpmn2:outgoing>
				    </bpmn2:task>

		        </xsl:for-each>
		    </bpmn2:process>

		    <bpmndi:BPMNDiagram id="BPMNDiagram_1" name="procurement subprocess">

		    	<xsl:for-each select="structure/process/list">
			    	<bpmndi:BPMNShape id="{DiagramID}" bpmnElement="{ShapeID}">
	        			<dc:Bounds height="{bounds/height}" width="{bounds/width}" x="{bounds/x}" y="{bounds/y}"/>
	      			</bpmndi:BPMNShape>
	      		</xsl:for-each>

		    </bpmndi:BPMNDiagram>

    		
    		
    		
    	</bpmn2:definitions>

    </xsl:template>
</xsl:stylesheet>