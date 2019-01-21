package my;

import org.json.JSONObject;

import af.sql.AfSqlWhere;
import af.web.restful.AfRestfulApi;
import my.db.StudentProfile;
import my.dbutil.C3P0Factory;

public class ProfileGetApi extends AfRestfulApi
{

	@Override
	public Object execute(JSONObject jreq) throws Exception
	{
		int id = jreq .getInt("id");
		
		AfSqlWhere where = new AfSqlWhere();
		where.add2("id", id);		
		String sql = "SELECT * FROM student_profile"+ where;
		
		StudentProfile row = (StudentProfile)C3P0Factory.get(sql, StudentProfile.class);
		if(row == null)
		{
			row = new StudentProfile();
			row.setId(id);
			JSONObject jresp = new JSONObject(row);
			String url="./data/default/no-avatar.jpg";
			jresp.put("photoUrl", url);
			return jresp;
		}
		
		JSONObject jresp = new JSONObject(row);
		String url = this.httpReq.getContextPath() + "/" + row.getPhoto();
		jresp.put("photoUrl", url);
		
		return jresp;
	}

}
