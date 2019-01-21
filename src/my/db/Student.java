package my.db; 

import af.sql.annotation.AFCOLUMNS; 
import af.sql.annotation.AFTABLE; 
import java.util.Date; 

@AFTABLE(name="student")  
@AFCOLUMNS(auto=true) 
public class Student 
{ 
 
	private Integer id ; 
	private String name ; 
	private Boolean sex ; 
	private String phone ; 


	public void setId(Integer id)
	{
		this.id=id;
	}
	public Integer getId()
	{
		return this.id;
	}
	public void setName(String name)
	{
		this.name=name;
	}
	public String getName()
	{
		return this.name;
	}
	public void setSex(Boolean sex)
	{
		this.sex=sex;
	}
	public Boolean getSex()
	{
		return this.sex;
	}
	public void setPhone(String phone)
	{
		this.phone=phone;
	}
	public String getPhone()
	{
		return this.phone;
	}

} 
 