using System;
using System.Text.Json.Serialization;
using Mpt.Domain.Shared;

namespace Mpt.Domain.Roles
{
    public class RoleId : EntityId
    {
        [JsonConstructor]
        public RoleId(Guid value) : base(value)
        {
        }

        public RoleId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}