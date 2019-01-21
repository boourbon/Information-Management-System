package my;

import java.util.HashMap;
import java.util.List;



import org.json.JSONArray;
import org.json.JSONObject;

import af.web.restful.AfRestfulApi;
import my.db.Student;
import my.dbutil.C3P0Factory;

public class StudentListApi extends AfRestfulApi
{

	@Override
	public Object execute(JSONObject jreq) throws Exception
	{
		String sql = "select * from student";
		List<Student> rows = C3P0Factory.executeQuery(sql, Student.class);
		
		JSONArray result = new JSONArray(rows);
		return result;
	}

}
