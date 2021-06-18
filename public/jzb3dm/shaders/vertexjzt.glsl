
precision highp float;
uniform vec4 u_diffuse,u_ambient,u_specular;
attribute vec3 a_position;
attribute vec3 a_normal;
attribute float a_batchId;
uniform mat3 u_normalMatrix;
uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;
attribute vec2 a_texcoord0;
attribute vec2 a_texcoord1;
varying vec2 texcoord0;
varying vec2 texcoord1;
varying vec3 positionF;
varying float fFlag;


uniform vec3 u_CenterPt; 

uniform mat4 u_firstMatrix;
uniform mat4 u_secondMatrix;
uniform mat4 u_transMatrix;
uniform mat4 u_index0Matrix;
uniform mat4 u_index1Matrix;
uniform mat4 u_index2Matrix;
uniform mat4 u_index3Matrix;

uniform bool u_EnbleMonomer;
uniform bool u_YZTrans;

varying vec3 v_positionEC;

attribute vec4 a_color0;
attribute vec4 a_color1;
attribute vec4 a_color2;
attribute vec4 a_color3;

varying vec4 texcoord0UV;
varying vec4 texcoord0DUV;

varying vec4 texcoord1UV;
varying vec4 texcoord1DUV;
varying vec3 v_normal;

vec3 tranPoint(vec3 tmpPoint,bool bYZAmend)
{
	vec3 retVec3;
	
	if(bYZAmend==false)
	{
		retVec3[0] = tmpPoint[0]+u_CenterPt[0];
		retVec3[1] = -tmpPoint[2]+u_CenterPt[1];
		retVec3[2] = tmpPoint[1]+u_CenterPt[2];
	}
	else{
		retVec3[0] = tmpPoint[0]+u_CenterPt[0];
		retVec3[1] = tmpPoint[1]+u_CenterPt[1];
		retVec3[2] = tmpPoint[2]+u_CenterPt[2];
	}
   
	 
	return retVec3;
}

vec3 rotatePoint(vec3 tmpPoint,bool bYZAmend)
{
	vec3 retVec3 =tranPoint(tmpPoint,bYZAmend);
    
	vec4 pos4 =  u_transMatrix * vec4(retVec3,1.0);
	
	retVec3[0] = pos4[0];
	retVec3[1] = pos4[1];
	retVec3[2] = pos4[2];
	return retVec3;
}

float TRI_AREA2_NEGATIVE_SENSITIVE(float x1, float y1, float x2,float y2,float x3,float y3) 
{
	return ((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
} 

bool triangleCheck(vec2 ptC,vec2 pt0,vec2 pt1,vec2 pt2)
{
    float MyZero = 0.0000001;
 
	int nV = 0;

	float dArea = TRI_AREA2_NEGATIVE_SENSITIVE(pt0.x, pt0.y, pt1.x,pt1.y, ptC.x, ptC.y);

	if(dArea > MyZero) //鐐瑰湪杈圭殑宸﹁竟(閫嗘椂閽?闈㈢Н涓烘)
		nV++;
	else if(dArea < -MyZero) //鐐瑰湪杈圭殑鍙宠竟(椤烘椂閽?闈㈢Н涓鸿礋)
		nV--;

	dArea = TRI_AREA2_NEGATIVE_SENSITIVE(pt1.x, pt1.y, pt2.x,pt2.y, ptC.x, ptC.y);

	if(dArea > MyZero) //鐐瑰湪杈圭殑宸﹁竟(閫嗘椂閽?闈㈢Н涓烘)
		nV++;
	else if(dArea < -MyZero) //鐐瑰湪杈圭殑鍙宠竟(椤烘椂閽?闈㈢Н涓鸿礋)
		nV--;

	dArea = TRI_AREA2_NEGATIVE_SENSITIVE(pt2.x, pt2.y, pt0.x,pt0.y, ptC.x, ptC.y);

	if(dArea > MyZero) //鐐瑰湪杈圭殑宸﹁竟(閫嗘椂閽?闈㈢Н涓烘)
		nV++;
	else if(dArea < -MyZero) //鐐瑰湪杈圭殑鍙宠竟(椤烘椂閽?闈㈢Н涓鸿礋)
		nV--;

	//濡傛灉娴嬭瘯鐐归兘鍦ㄤ笁瑙掑舰杈圭殑宸﹁竟鎴栧彸杈? 鐐瑰氨鍦ㄤ笁瑙掑舰鍐?
	if((nV==3) || (nV==-3))
		return true;

	return false;
}

vec2 getPointValue(int indexPt)
{
	vec2 ptCur = vec2(0.0,0.0);
	
	if(indexPt>=16) return ptCur;
	 
	if(indexPt==0)
	{
		return vec2(u_firstMatrix[0][0],u_firstMatrix[0][1]); 
	}
	else if(indexPt==1)
	{
		return vec2(u_firstMatrix[0][2],u_firstMatrix[0][3]); 
	}
	else if(indexPt==2)
	{
		return vec2(u_firstMatrix[1][0],u_firstMatrix[1][1]); 
	}
	else if(indexPt==3)
	{
		return vec2(u_firstMatrix[1][2],u_firstMatrix[1][3]); 
	}
	else if(indexPt==4)
	{
		return vec2(u_firstMatrix[2][0],u_firstMatrix[2][1]); 
	}
	else if(indexPt==5)
	{
		return vec2(u_firstMatrix[2][2],u_firstMatrix[2][3]); 
	}
	else if(indexPt==6)
	{
		return vec2(u_firstMatrix[3][0],u_firstMatrix[3][1]); 
	}
	else if(indexPt==7)
	{
		return vec2(u_firstMatrix[3][2],u_firstMatrix[3][3]); 
	}
	else if(indexPt==8)
	{
		return vec2(u_secondMatrix[0][0],u_secondMatrix[0][1]); 
	}
	else if(indexPt==9)
	{
		return vec2(u_secondMatrix[0][2],u_secondMatrix[0][3]); 
	}
	else if(indexPt==10)
	{
		return vec2(u_secondMatrix[1][0],u_secondMatrix[1][1]); 
	}
	else if(indexPt==11)
	{
		return vec2(u_secondMatrix[1][2],u_secondMatrix[1][3]); 
	}
	else if(indexPt==12)
	{
		return vec2(u_secondMatrix[2][0],u_secondMatrix[2][1]); 
	}
	else if(indexPt==13)
	{
		return vec2(u_secondMatrix[2][2],u_secondMatrix[2][3]); 
	}
	else if(indexPt==14)
	{
		return vec2(u_secondMatrix[3][0],u_secondMatrix[3][1]); 
	}
	else if(indexPt==15)
	{
		return vec2(u_secondMatrix[3][2],u_secondMatrix[3][3]); 
	}

    return ptCur;
}

int getIndexValue(int index)
{
	int nRet=0;
	
	if(index>=60) return nRet;
	
	for(int i=0;i<4;++i)
	{
		for(int n=0;n<4;++n)
		{
			for(int m=0;m<4;++m)
			{
				int curIndex = i*16+n*4+m;
				if(curIndex==index)
				{
					if(i==0)
					{
						nRet = int(u_index0Matrix[n][m]);
					}
					else if(i==1)
					{
						nRet = int(u_index1Matrix[n][m]);
					}
					else if(i==2)
					{
						nRet = int(u_index2Matrix[n][m]);
					}
					else if(i==3)
					{
						nRet = int(u_index3Matrix[n][m]);
					}
					return nRet;
				}
			}
		}
	}
	
	return nRet;
	
 
}
bool checkPolygon(vec3 posCur)
{
	int ptLen = int(u_index3Matrix[3][2]);
	int indexLen = int(u_index3Matrix[3][3]);
	
	if(ptLen==0 || indexLen==0) return false;
	
	float minX = u_index3Matrix[2][2];
	float minY = u_index3Matrix[2][3];
	
	float maxX = u_index3Matrix[3][0];
	float maxY = u_index3Matrix[3][1];
	
	posCur  = rotatePoint(posCur,u_YZTrans);
	
	if(posCur.x < minX || posCur.x > maxX) return false;
	if(posCur.y < minY || posCur.y > maxY) return false;
	
	vec2 posCur2 = vec2(posCur.x,posCur.y);
 
	int nTriNum = indexLen/3;
	
	bool bFind = false;
	
	for(int i=0;i<19;++i)
	{
		if(i>nTriNum) continue;
		
		int index_p0 = getIndexValue(i*3);
		int index_p1 = getIndexValue(i*3+1);
		int index_p2 = getIndexValue(i*3+2);
		
		vec2 pt0 = getPointValue(index_p0);
		vec2 pt1 = getPointValue(index_p1);
		vec2 pt2 = getPointValue(index_p2);
		
		bool bOk = triangleCheck(posCur2,pt0,pt1,pt2);
	
		if(bOk==true)
		{
			bFind = true;
			break;
		}
	}
	return bFind;
}

void main(void)
{
	positionF = a_position;
	
	//if(u_EnbleMonomer==false)
	//{
		//fFlag = 1.0; 
	//}
	//else
	//{
		//bool bOK = checkPolygon(positionF);
		
		//if(bOK==true)
		//{
			//fFlag = 1.0; 
			//vec4 pos = u_modelViewMatrix * vec4(a_position.x,a_position.y,a_position.z - 4.0,1.0);		
			//gl_Position = u_projectionMatrix * pos;
		//}
		//else{
			//fFlag = 1.0;  
			//vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);
			//gl_Position = u_projectionMatrix * pos;
		//}
	//}
	
	vec4 pos = u_modelViewMatrix * vec4(a_position,1.0);
	v_positionEC = pos.xyz;
	gl_Position = u_projectionMatrix * pos;
	
	v_normal = a_normal;
	
	texcoord0UV = a_color0;
	//texcoord0DUV = a_color1;
	texcoord1UV = a_color2;
	//texcoord1DUV = a_color3;
	
	texcoord0 = vec2(a_texcoord0);
	texcoord1 = vec2(a_texcoord1);
	

}