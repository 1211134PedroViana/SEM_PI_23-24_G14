using System;
using Mpt.Domain.Shared;
using Newtonsoft.Json;

namespace Mpt.Domain.SystemUsersCopy
{
    public class SystemUserCopyId : EntityId
    {
        [JsonConstructor]
        public SystemUserCopyId(Guid value) : base(value)
        {
        }

        public SystemUserCopyId(String value) : base(value)
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